import OpengraphImage from 'components/opengraph-image';

export const alt = 'SchoolKits — School Ready, Stress Free';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return await OpengraphImage();
}
