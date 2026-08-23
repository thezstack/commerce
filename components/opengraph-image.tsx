import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };
  const [fontData, logoData, studentData] = await Promise.all([
    readFile(join(process.cwd(), 'fonts', 'Inter-Bold.ttf')),
    readFile(join(process.cwd(), 'media', 'logo.png')),
    readFile(join(process.cwd(), 'media', 'little_person_homePage.png'))
  ]);
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;
  const studentSrc = `data:image/png;base64,${studentData.toString('base64')}`;
  const pageTitle =
    title && !['School Kits', 'SchoolKits'].includes(title) ? title : 'School Ready, Stress Free';

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#f4fdff',
          color: '#15222b',
          display: 'flex',
          fontFamily: 'Inter',
          height: '100%',
          overflow: 'hidden',
          padding: '64px 72px',
          position: 'relative',
          width: '100%'
        }}
      >
        <div
          style={{
            background: '#a9dded',
            borderRadius: '50%',
            display: 'flex',
            height: 720,
            position: 'absolute',
            right: -185,
            top: -55,
            width: 720
          }}
        />
        <img
          alt=""
          height="590"
          src={studentSrc}
          style={{ bottom: -24, position: 'absolute', right: 18 }}
          width="500"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 690,
            position: 'relative'
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <img alt="" height="92" src={logoSrc} width="94" />
            <div style={{ fontSize: 48, marginLeft: 22 }}>SchoolKits</div>
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.05, marginTop: 42 }}>{pageTitle}</div>
          <div style={{ color: '#425f70', fontSize: 30, lineHeight: 1.35, marginTop: 28 }}>
            Exact school supplies, packed and delivered to the classroom.
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
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
