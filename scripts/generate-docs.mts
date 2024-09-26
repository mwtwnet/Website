import { generateFiles } from 'fumadocs-openapi';
 
void generateFiles({
  input: ['./test/test.yaml'], // the OpenAPI schemas
  output: './content/docs/frogmusic/api', // the output directory
});