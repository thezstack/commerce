'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './homepage.module.css';

const media = {
  video: '/media/optimized/school-life-mobile.5bd547d598de.mp4',
  poster: '/media/optimized/school-life-mobile.78e4356aeb2f.webp'
};

export default function ClassroomVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const syncMedia = () => {
      // Set these properties before assigning a source for iOS inline autoplay.
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.poster = media.poster;
      setFailed(false);
      if (preference.matches || connection?.saveData) {
        setShowPoster(true);
        video.autoplay = false;
        video.pause();
        video.removeAttribute('src');
        video.load();
      } else {
        setShowPoster(pausedByUser.current);
        video.autoplay = !pausedByUser.current;
        if (video.getAttribute('src') !== media.video) video.src = media.video;
        if (!pausedByUser.current)
          void video.play().catch(() => {
            setPlaying(false);
            setShowPoster(true);
          });
      }
    };
    syncMedia();
    preference.addEventListener('change', syncMedia);
    return () => {
      preference.removeEventListener('change', syncMedia);
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
    setShowPoster(false);
    video.muted = true;
    video.playsInline = true;
    if (!video.getAttribute('src')) video.src = media.video;
    try {
      await video.play();
    } catch {
      setShowPoster(true);
      setPlaying(false);
    }
  };

  return (
    <>
      <link rel="preload" as="image" href={media.poster} fetchPriority="high" />
      <picture className={styles.poster} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.poster} alt="" fetchPriority="high" loading="eager" decoding="async" />
      </picture>
      <video
        ref={videoRef}
        id="classroom-video"
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        controls={false}
        onPlaying={() => {
          setShowPoster(false);
          setPlaying(true);
        }}
        onEmptied={() => setPlaying(false)}
        onPause={() => {
          setPlaying(false);
          setShowPoster(true);
        }}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
        style={showPoster || failed ? { visibility: 'hidden' } : undefined}
      />
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
