import { DocsBody } from "fumadocs-ui/page";
import { Pre, CodeBlock } from 'fumadocs-ui/components/codeblock';
import { Metadata } from "next";
import { LinkButton } from "@/app/components/LinkButton";
import { EyeIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  return (
    <DocsBody style={{marginTop: "50px", marginBottom: "50px"}}>
      {/* <div className="fixed inset-0 z-[-1] overflow-hidden duration-1000 animate-in fade-in [perspective:2000px]">
        <div
          className="fixed bottom-[10%] left-1/2 size-[1200px] origin-bottom bg-primary/30 opacity-30"
          style={{
            transform: 'rotateX(75deg) translate(-50%, 400px)',
            backgroundImage:
              'radial-gradient(50% 50% at center,transparent,hsl(var(--background))), repeating-linear-gradient(to right,hsl(var(--primary)),hsl(var(--primary)) 1px,transparent 2px,transparent 100px), repeating-linear-gradient(to bottom,hsl(var(--primary)),hsl(var(--primary)) 2px,transparent 3px,transparent 100px)',
          }}
        />
      </div> */}
      <div className="container">
        <h1 className="text-center text-4xl font-bold">版權政策</h1>
        <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
          <LinkButton
            href="/privacy"
            variant="primary"
          >
            隱私權政策
          </LinkButton>
          <LinkButton
            href="/tos"
            variant="secondary"
          >
            服務條款
          </LinkButton>
        </div>
        <h2> 一、網站使用 </h2>
        <p>本網站及其包含的所有資料，包括但不限於資訊、描述、照片、文字、數據、影片、圖片、影像、樣品、軟體及其他資料和服務（以下統稱為「資料」），僅供個人在合法範圍內參考和非商業用途使用，並受制於本使用須知。您不得以非法或違反本使用須知及法令的方式使用本網站或其包含的資料，且不得以任何可能損害、癱瘓、超載、損傷本網站伺服器或干擾他人使用本網站的方式使用。</p>
        <p>若您被拒絕進入本網站或其任何資料區，請勿嘗試以駭客手法或未經授權的方式進入，或者進入連接至本網站伺服器的電腦系統或網路。</p>
        <p>您了解並同意，本團隊有權隨時拒絕或終止您對本網站的進入，並可在不通知您的情況下隨時修改或更新本網站資料。同時，本團隊保留無需通知即可隨時修改、暫停、終止或改變網站內產品、產品規格或服務的權利，且所有本網站中的資料對本團隊不構成具拘束力的義務。</p>

        <h2> 二、個人意見或個人資料之提供 </h2>
        <p>您傳送至本網站的任何其他通訊或材料，包括但不限於意見、客戶回應、建議等，將被視為非保密和非專有資料處理。一旦您將這些資料傳送至本網站並被接收，即視為您同意本團隊永久免費使用該資料，包括但不限於散布、出版、傳送、改作、發行、公開發表等用途。請仔細閱讀本團隊的隱私權聲明，其中規定了與本網站收集到的個人資料相關的使用和政策。</p>
        <p>本網站不對討論、傳送、聊天及公布板上的內容承擔任何責任。您同意不在本網站上公布或傳送任何具誹謗、攻擊性、不雅、猥褻或違法的文字、圖片或檔案，如有違反，本團隊有權進行管理和監督，並視情況採取必要的法律途徑。</p>
        
        <h2> 三、商標等智慧財產權維護 </h2>
        <p>本網站上的商標、服務標誌、設計、圖片、文字內容及其他智慧財產權均為本團隊或其他權利人所有，受商標法、著作權法等相關法律規範保護。未經正式書面授權，任何人不得擅自使用、拷貝、重製、複製、列印、修改、展示、張貼、傳送、散佈本網站上的任何資訊。請尊重智慧財產權，未經授權不得濫用。</p>

        <h2> 四、資料之適當性、正確性、及時性及有效性 </h2>
        <p>雖本網站將努力提供準確和及時的訊息和內容，但不對其準確性和及時性給予任何直接或間接的保證。您了解並同意本網站的資料可能包含技術上的不正確或圖文錯誤，本團隊保留修改和更正的權利。同時，本團隊不擔保本網站所含資料在中華民國境外的適當性和有效性，境外使用者應自行遵守當地法律。</p>

        <h2> 五、與其他網站連結 </h2>
        <p>本網站提供至第三人所有或經營之網站的外部連結，僅為方便使用者而設置，本團隊對第三人網站及其內容不提供任何保證、贊助或推薦。使用者應審慎考慮相關風險後決定是否使用該等連結。</p>

        <h2> 六、其他免責條款 </h2>
        <p>本團隊無法保證本網站不受到任何技術或人為問題的影響，包括但不限於錯誤、中斷、遺漏、電腦病毒、傳輸延遲、或線路故障。同時，本團隊對於因使用或無法使用本網站所提供的服務而導致的任何損害，包括但不限於資料喪失、錯誤、遭人篡改、經濟上的損失或其他不利益，概不負賠償責任。</p>
        <p>使用者在使用本網站時，應自行採取必要的防護措施，以防範可能的電腦病毒或其他有害軟體或程式侵害。對於使用本網站所產生的任何風險及其可能帶來的損害，本團隊概不負責。</p>
        <p>本團隊保留隨時變更和修改本使用須知的權利，並建議使用者定期查閱以獲取最新資訊。對於任何變更修改，本團隊將不再另行通知或提醒。使用者使用本網站即表示同意接受本免責條款的約束。</p>

        <h2> 七、損害賠償 </h2>
        <p>凡使用者及其網路位置進入本網站，無論為使用者自己或他人，若因違反本使用條款（包括隱私權政策）或非法使用本網站而導致任何人對本團隊及其管理人員、工作人員提出主張、訴訟或請求，使用者同意在該等訴訟或爭議中無條件協助本團隊及相關人員辯護。如因此造成本團隊或相關人員損害，使用者同意承擔完全的損害賠償責任。</p>

        <h2> 八、準據法 </h2>
        <p>因使用本網站所生之任何爭議，應依據中華民國相關法律規定處理。本團隊保留隨時終止或暫停本網站服務之權利。一旦本團隊停止本網站服務，使用者應立即銷毀所有由本網站獲得的資訊、內容或檔案。</p>
        <p>本團隊保留變更及修改本使用須知之權利，使用者應定期查閱。對於本使用須知的任何變更修改，本團隊不會另行通知或提醒。</p>
        <p>以上條款為本網站使用的基本規定，使用者在使用本網站前應仔細閱讀並遵守。若使用者不同意本使用須知的任何部分，請勿使用本網站。使用本網站即表示使用者同意並遵守本使用須知的所有條款和規定。</p>
      </div>
    </DocsBody>
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return {
    title: "版權政策 - 多元世界",
    description: "版權政策",
  };
}