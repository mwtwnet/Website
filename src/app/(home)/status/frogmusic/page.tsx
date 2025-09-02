'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Callout } from 'fumadocs-ui/components/callout'
import { Turnstile } from '@marsidev/react-turnstile'

// Cookie utility functions
const setCookie = (name: string, value: string, hours: number = 24) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

interface ShardData {
  shardId: number
  status: number
  ping: number
  guilds: number
  guildIds: string[]
  members: number
}

interface ClusterData {
  id: number
  shards: number
  shardIds: number[]
  totalGuilds: number
  totalMembers: number
  ping: number
  uptime: number | null
  started: number | null
  voiceConnections: number
  memoryUsage: {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
    arrayBuffers: number
  }
  shardAvgPing: number
  perShardData: ShardData[]
}

interface StatusData {
  totalClusters: number
  clusters: ClusterData[]
}

// Shard status mapping
const getShardStatus = (status: number) => {
  switch (status) {
    case 0: return { text: 'READY', color: 'text-green-400' }
    case 1: return { text: 'CONNECTING', color: 'text-yellow-400' }
    case 2: return { text: 'RECONNECTING', color: 'text-orange-400' }
    case 3: return { text: 'IDLE', color: 'text-blue-400' }
    case 4: return { text: 'NEARLY', color: 'text-purple-400' }
    case 5: return { text: 'DISCONNECTED', color: 'text-red-400' }
    case 6: return { text: 'WAITING_FOR_GUILDS', color: 'text-indigo-400' }
    case 7: return { text: 'IDENTIFYING', color: 'text-pink-400' }
    case 8: return { text: 'RESUMING', color: 'text-teal-400' }
    default: return { text: 'UNKNOWN', color: 'text-gray-400' }
  }
}

const formatUptime = (uptime: number | null) => {
  if (!uptime) return 'N/A'
  
  const seconds = Math.floor(uptime / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d, ${hours % 24}h, ${minutes % 60}m`
  if (hours > 0) return `${hours}h, ${minutes % 60}m, ${seconds % 60}s`
  if (minutes > 0) return `${minutes}m, ${seconds % 60}s`
  return `${seconds}s`
}

export default function FrogMusicStatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(null)
  const [searchGuildId, setSearchGuildId] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isVerified, setIsVerified] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const turnstileRef = useRef<any>(null)

  // Handle hydration and restore cookie state
  useEffect(() => {
    setIsHydrated(true)
    // Check cookies after hydration to restore verification state
    const storedVerified = getCookie('turnstile-verified') === 'true'
    const storedToken = getCookie('turnstile-token')
    
    if (storedVerified && storedToken) {
      setIsVerified(true)
      setTurnstileToken(storedToken)
    }
  }, [])

  // Turnstile handlers
  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token)
    setIsVerified(true)
    // Store verification state in cookies (24 hours)
    setCookie('turnstile-verified', 'true', 24)
    setCookie('turnstile-token', token, 24)
  }

  const handleTurnstileError = () => {
    setIsVerified(false)
    setTurnstileToken(null)
    // Clear cookies on error
    if (isHydrated) {
      deleteCookie('turnstile-verified')
      deleteCookie('turnstile-token')
    }
  }

  const handleTurnstileExpire = () => {
    setIsVerified(false)
    setTurnstileToken(null)
    setStatusData(null) // Clear status data when token expires
    // Clear cookies on expire
    if (isHydrated) {
      deleteCookie('turnstile-verified')
      deleteCookie('turnstile-token')
    }
  }

  useEffect(() => {
    const loadStatusData = async () => {
      if (!isVerified || !turnstileToken) return
      
      try {
        setError(null) // Clear any previous errors
        const response = await fetch(`/api/status/frogmusic?cf-turnstile-response=${encodeURIComponent(turnstileToken)}`)
        
        if (response.status === 401 || response.status === 403) {
          // Token invalid or expired, require re-verification
          setIsVerified(false)
          setTurnstileToken(null)
          // Clear cookies when token is invalid
          if (isHydrated) {
            deleteCookie('turnstile-verified')
            deleteCookie('turnstile-token')
          }
          // Reset the Turnstile widget
          if (turnstileRef.current) {
            turnstileRef.current.reset()
          }
          return
        }

        if (response.status === 500) {
          setError('無法找到狀態數據，服務器暫時不可用。請稍後再試。')
          return
        }

        if (!response.ok) {
          setError(`無法加載狀態數據（錯誤 ${response.status}）。請稍後再試。`)
          return
        }
        
        const data = await response.json()
        setStatusData(data)
        setLastUpdated(new Date())
        setError(null) // Clear error on successful load
      } catch (error) {
        console.error('Failed to load status data:', error)
        setError('網絡連接錯誤，無法獲取狀態數據。請檢查您的網絡連接並重試。')
      }
    }

    // Load initial data only when verified
    if (isVerified && turnstileToken) {
      loadStatusData()
      
      // Auto-refresh every 15 seconds
      const interval = setInterval(loadStatusData, 15000)
      return () => clearInterval(interval)
    }
  }, [isVerified, turnstileToken])

  // Don't show sensitive data until verified
  if (!isVerified) {
    return (
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">系統: 青蛙音樂</h1>
          <p className="text-gray-300 mb-8">請完成驗證以查看系統狀態</p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">安全驗證</h2>
              <p className="text-gray-400 mb-6">為了保護系統資訊，請先完成安全驗證</p>
              
              {isHydrated && (
                <div className="flex justify-center">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                    onSuccess={handleTurnstileSuccess}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                    options={{
                      action: 'status-check',
                      cData: 'frogmusic-status'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!statusData) {
    return (
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">系統: 青蛙音樂</h1>
          {error ? (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 my-8">
              <div className="flex items-center">
                <div className="text-red-400 mr-3">⚠️</div>
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">載入錯誤</h3>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setError(null)
                  // Trigger a manual refresh
                  if (isVerified && turnstileToken) {
                    window.location.reload()
                  }
                }}
                className="cursor-pointer mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                重試
              </button>
            </div>
          ) : (
            <p className="text-gray-300 mb-8">正在加載狀態數據...</p>
          )}
        </div>
      </div>
    )
  }

  const totalGuilds = statusData.clusters.reduce((sum, cluster) => sum + cluster.totalGuilds, 0)
  const totalMembers = statusData.clusters.reduce((sum, cluster) => sum + cluster.totalMembers, 0)
  const totalShards = statusData.clusters.reduce((sum, cluster) => sum + cluster.shards, 0)
  const operationalShards = statusData.clusters.flatMap(cluster => cluster.perShardData).filter(shard => shard.status === 0).length
  const problemClusters = statusData.clusters.filter(cluster => 
    cluster.perShardData.some(shard => shard.status !== 0)
  ).length

  // Find which shard contains the searched guild ID
  const findShardWithGuild = (guildId: string) => {
    if (!guildId.trim()) return null
    for (const cluster of statusData.clusters) {
      for (const shard of cluster.perShardData) {
        if (shard.guildIds.includes(guildId.trim())) {
          return { clusterId: cluster.id, shardId: shard.shardId }
        }
      }
    }
    return null
  }

  const foundShard = findShardWithGuild(searchGuildId)

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Callout className='my-2 mb-8'>
            系統狀態於 {lastUpdated.toLocaleTimeString()} 更新。數據每 15 秒自動刷新一次。
            <span className="float-right text-green-400">✓ 已驗證</span>
        </Callout>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">系統: 青蛙音樂</h1>
            <p className="text-gray-300">
                {totalGuilds} 個公會, {totalMembers.toLocaleString()} 名成員, {totalShards} 個分片
            </p>
          </div>
          <button
            onClick={() => {
              setIsVerified(false)
              setTurnstileToken(null)
              setStatusData(null)
              setError(null) // Clear any errors when re-verifying
              // Clear cookies when manually re-verifying
              deleteCookie('turnstile-verified')
              deleteCookie('turnstile-token')
              // Reset the Turnstile widget when manually re-verifying
              if (turnstileRef.current) {
                turnstileRef.current.reset()
              }
            }}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            重新驗證
          </button>
        </div>

        <div className="mb-8">
          <div className="text-2xl mb-2">
            <span className="text-green-400">{operationalShards}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-gray-400">{totalShards}</span>
            <span className="text-gray-400"> 分片</span>
          </div>
          
          {problemClusters > 0 && (
            <div className="text-gray-400">
              {problemClusters} 個分片有問題。
            </div>
          )}
        </div>

        {/* Guild Search Bar */}
        <div className="mb-8">
          <div className="max-w-md">
            <label htmlFor="guildSearch" className="block text-sm font-medium text-gray-300 mb-2">
              Search for Guild ID
            </label>
            <div className="relative">
              <input
                id="guildSearch"
                type="text"
                placeholder="Enter Guild ID to find which shard it's on..."
                value={searchGuildId}
                onChange={(e) => setSearchGuildId(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchGuildId && (
                <button
                  onClick={() => setSearchGuildId('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
            {searchGuildId && foundShard && (
              <div className="mt-2 text-sm text-green-400">
                Found in Cluster {foundShard.clusterId}, Shard {foundShard.shardId}
              </div>
            )}
            {searchGuildId && !foundShard && searchGuildId.trim() && (
              <div className="mt-2 text-sm text-red-400">
                Guild ID not found in any shard
              </div>
            )}
          </div>
        </div>

        {/* Cluster Grid */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statusData.clusters.map((cluster) => {
            return (
              <div key={cluster.id} className="mb-6">
                <h2 className="text-xl font-bold mb-2">Cluster {cluster.id}</h2>
                {/* Cluster Info */}
                <ul className="text-sm text-gray-400 mb-3 list-inside space-y-1">
                    <li>Shards: {cluster.shardIds[0]} - {cluster.shardIds[cluster.shardIds.length - 1]}</li>
                    <li>{cluster.totalGuilds} guilds</li>
                    <li>{cluster.totalMembers.toLocaleString()} members</li>
                    <li>Uptime: {cluster.uptime ? formatUptime(cluster.uptime) : 'N/A'}</li>
                </ul>

                {/* Shard Grid for this cluster */}
                <div className="grid grid-cols-6 lg:grid-cols-8 gap-1 max-w-full">
                  {cluster.perShardData.map((shard) => {
                    const status = getShardStatus(shard.status)
                    const isHighlighted = foundShard && foundShard.clusterId === cluster.id && foundShard.shardId === shard.shardId
                    
                    return (
                      <div
                        key={shard.shardId}
                        className={cn(
                          "w-10 h-10 flex items-center justify-center text-xs font-medium cursor-pointer transition-all hover:scale-110",
                          "border",
                          isHighlighted 
                            ? "border-blue-400 bg-blue-600 text-white ring-2 ring-blue-400 ring-opacity-75" 
                            : "border-gray-600",
                          !isHighlighted && (
                            shard.status === 0 ? "bg-gray-800 text-green-400" : 
                            shard.status === 7 ? "bg-gray-800 text-red-400" :
                            "bg-gray-800 text-yellow-400"
                          )
                        )}
                        onClick={() => setSelectedCluster(cluster)}
                        title={`Shard ${shard.shardId}: ${status.text} - ${shard.ping === -1 ? 'N/A' : shard.ping + 'ms'}${isHighlighted ? ' - Contains searched Guild ID' : ''}`}
                      >
                        {shard.shardId}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Cluster Details Popup */}
        {selectedCluster && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCluster(null)}
          >
            <div 
              className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Cluster {selectedCluster.id}</h3>
                  <div className="text-gray-400 mt-2">
                    <div>Shards: {selectedCluster.shardIds[0]} - {selectedCluster.shardIds[selectedCluster.shardIds.length - 1]}</div>
                    <div>Total Guilds: {selectedCluster.totalGuilds.toLocaleString()}</div>
                    <div>Total Members: {selectedCluster.totalMembers.toLocaleString()}</div>
                    <div>Uptime: {selectedCluster.uptime ? formatUptime(selectedCluster.uptime) : 'N/A'}</div>
                    <div>Average Ping: {selectedCluster.shardAvgPing.toFixed(1)}ms</div>
                    <div>Memory Usage: {selectedCluster.memoryUsage.rss.toFixed(2)} MB</div>
                    <div>Voice Connections: {selectedCluster.voiceConnections}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCluster(null)}
                  className="text-gray-400 hover:text-white text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>
              
              {/* Shard Details Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2">Shard ID</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Ping</th>
                      <th className="text-left py-2">Guilds</th>
                      <th className="text-left py-2">Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCluster.perShardData.map((shard) => {
                      const status = getShardStatus(shard.status)
                      return (
                        <tr key={shard.shardId} className="border-b border-gray-700">
                          <td className="py-2 font-mono">{shard.shardId}</td>
                          <td className={cn("py-2", status.color)}>{status.text}</td>
                          <td className="py-2">{shard.ping === -1 ? 'N/A' : `${shard.ping}ms`}</td>
                          <td className="py-2">{shard.guilds}</td>
                          <td className="py-2">{shard.members.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
