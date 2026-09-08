'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './homepage.module.css';

const source = '/media/classroom-morning.mp4';

export default function ClassroomVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => {
      if (preference.matches) {
        video.autoplay = false;
        video.pause();
        video.removeAttribute('src');
        video.load();
      } else {
        video.autoplay = true;
        video.src = source;
        void video.play().catch(() => setPlaying(false));
      }
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => {
      preference.removeEventListener('change', syncPreference);
      video.pause();
    };
  }, []);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    if (!video.getAttribute('src')) video.src = source;
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
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
        style={failed ? { visibility: 'hidden' } : undefined}
      />
      <div className={styles.videoControl}>
        {failed ? (
          <span role="status">Classroom preview shown</span>
        ) : (
          <button
            type="button"
            onClick={toggle}
            aria-controls="classroom-video"
            aria-label={playing ? 'Pause classroom video' : 'Play classroom video'}
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
