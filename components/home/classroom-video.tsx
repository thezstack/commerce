'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './homepage.module.css';

const desktopMedia = {
  video: '/media/classroom-morning.mp4',
  poster: '/media/classroom-morning.jpg'
};
const mobileMedia = {
  video: '/media/school-life-mobile.mp4',
  poster: '/media/school-life-mobile.jpg'
};
const selectMedia = () =>
  window.matchMedia('(max-width: 600px)').matches ? mobileMedia : desktopMedia;

export default function ClassroomVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 600px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const syncMedia = () => {
      const media = selectMedia();
      video.poster = media.poster;
      setFailed(false);
      if (preference.matches || connection?.saveData) {
        video.autoplay = false;
        video.pause();
        video.removeAttribute('src');
        video.load();
      } else {
        video.autoplay = !pausedByUser.current;
        if (video.getAttribute('src') !== media.video) video.src = media.video;
        if (!pausedByUser.current) void video.play().catch(() => setPlaying(false));
      }
    };
    syncMedia();
    preference.addEventListener('change', syncMedia);
    mobile.addEventListener('change', syncMedia);
    return () => {
      preference.removeEventListener('change', syncMedia);
      mobile.removeEventListener('change', syncMedia);
      video.pause();
    };
  }, []);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      pausedByUser.current = true;
      video.autoplay = false;
      video.pause();
      return;
    }
    pausedByUser.current = false;
    if (!video.getAttribute('src')) video.src = selectMedia().video;
    try {
      await video.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        id="classroom-video"
        className={styles.video}
        poster="/media/classroom-morning.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        controls={false}
        onPlaying={() => setPlaying(true)}
        onEmptied={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
        style={failed ? { visibility: 'hidden' } : undefined}
      />
      {/* Cover native mobile play overlays until frames are actually playing. */}
      {(!playing || failed) && <div className={styles.videoPoster} aria-hidden="true" />}
      <div className={styles.videoControl}>
        {failed ? (
          <span role="status">School day preview shown</span>
        ) : (
          <button
            type="button"
            onClick={toggle}
            aria-controls="classroom-video"
            aria-label={playing ? 'Pause video' : 'Play video'}
          >
            {playing ? (
              <Pause size={15} aria-hidden="true" />
            ) : (
              <Play size={15} aria-hidden="true" />
            )}
            {playing ? 'Pause video' : 'Play video'}
          </button>
        )}
      </div>
    </>
  );
}
