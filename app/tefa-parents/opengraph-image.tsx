import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'School Kits TEFA Parent Ordering Help';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  const fontData = await readFile(join(process.cwd(), 'fonts', 'Inter-Bold.ttf'));
  const logoData = await readFile(join(process.cwd(), 'media', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-[#F4FDFF] p-16">
        <div tw="flex h-full w-full flex-col justify-between rounded-[48px] border border-[#B7E5F2] bg-white p-14">
          <div tw="flex items-center">
            <img src={logoSrc} width="116" height="116" alt="" />
            <div tw="ml-7 flex flex-col">
              <p tw="m-0 text-5xl font-bold text-[#073B4C]">School Kits</p>
              <p tw="m-0 mt-2 text-3xl font-bold text-[#0B80A7]">TEFA Parent Ordering Help</p>
            </div>
          </div>

          <div tw="flex flex-col">
            <p tw="m-0 max-w-[920px] text-6xl font-bold leading-[1.08] text-[#073B4C]">
              Find School Kits Supply for TEFA orders
            </p>
            <p tw="m-0 mt-8 max-w-[900px] text-3xl font-bold leading-[1.35] text-[#315565]">
              Search “School Kits” and choose the Supplies category in TEFA Finder or Odyssey.
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
