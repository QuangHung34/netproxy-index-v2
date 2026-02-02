// GsapMarquee.tsx (full version - màu sắc đầy đủ từ đầu, không mờ khi hover)
import React, {
  FC,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  HTMLAttributes,
  useEffect,
} from "react";
import { gsap } from "gsap";

type Direction = "left" | "right";

type GsapMarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: number; // px/s
  direction?: Direction; // "left" | "right"
  gap?: number; // gap between items
  segmentGap?: number; // gap between segment copies
  hoverTimeScale?: number; // slow speed khi hover track
  pauseOnHoverTrack?: boolean;
  disableBlur?: boolean;
  itemScale?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export const GsapMarquee: FC<GsapMarqueeProps> = ({
  children,
  className = "",
  speed = 60,
  direction = "left",
  gap = 24,
  segmentGap,
  hoverTimeScale = 0.35,
  pauseOnHoverTrack = false,
  disableBlur = true,
  itemScale = 1.3,
  ...rest
}) => {
  const segGap = segmentGap ?? gap;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const baseSpeedRef = useRef(speed);
  const [dupCount, setDupCount] = useState(2);

  const isRight = direction === "right";

  const destroyTimeline = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
  }, []);

  const setup = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const wraps = Array.from(track.querySelectorAll<HTMLElement>(".gm-wrap"));
    const firstWrap = wraps[0];
    if (!firstWrap) return;

    const segmentContentW = firstWrap.getBoundingClientRect().width;
    const containerW = container.getBoundingClientRect().width;
    const segmentWWithGap = segmentContentW + segGap;

    const minNeeded = Math.max(
      2,
      Math.ceil((containerW * 2) / Math.max(1, segmentWWithGap))
    );
    if (minNeeded !== dupCount) {
      setDupCount(minNeeded);
      return;
    }

    gsap.set(track, { x: 0 });
    if (isRight) {
      gsap.set(track, { x: -segmentWWithGap });
    }

    const duration = segmentWWithGap / Math.max(1, baseSpeedRef.current);

    destroyTimeline();
    tlRef.current = gsap.to(track, {
      x: isRight ? 0 : -segmentWWithGap,
      duration,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        const current = gsap.getProperty(track, "x") as number;
        const next = isRight
          ? current - segmentWWithGap
          : current + segmentWWithGap;
        gsap.set(track, { x: next });
      },
    });
  }, [destroyTimeline, dupCount, isRight, segGap]);

  // ✅ Màu sắc đầy đủ từ đầu + không mờ khi hover
  const segment = useMemo(() => {
    return (
      <div className="gm-segment" style={{ display: "inline-flex", gap }}>
        {React.Children.map(children, (child, idx) => (
          <div
            key={idx}
            className="gm-item filter-none hover:filter-none"
            style={{ 
              display: "inline-flex", 
              alignItems: "center",
              transform: `scale(${itemScale})`,
              transformOrigin: "center center",
              willChange: "transform",
              // ✅ Luôn full màu sắc từ đầu
              filter: "none !important",
              imageRendering: "auto",
              backfaceVisibility: "hidden"
            }}
            // ✅ Chỉ slow marquee speed khi hover, KHÔNG đổi filter
            onMouseEnter={() => {
              if (!tlRef.current) return;
              gsap.to(tlRef.current, {
                timeScale: hoverTimeScale,
                duration: 0.2,
              });
            }}
            onMouseLeave={() => {
              if (!tlRef.current) return;
              gsap.to(tlRef.current, { timeScale: 1, duration: 0.25 });
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }, [children, gap, hoverTimeScale, itemScale]);

  const segments = useMemo(() => {
    return new Array(dupCount).fill(null).map((_, i) => (
      <div
        key={i}
        className="gm-wrap"
        style={{
          flex: "0 0 auto",
          display: "inline-block",
          marginRight: segGap,
        }}
      >
        {segment}
      </div>
    ));
  }, [dupCount, segGap, segment]);

  useLayoutEffect(() => {
    baseSpeedRef.current = speed;
    setup();

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    roRef.current?.disconnect();
    roRef.current = new ResizeObserver(() => {
      destroyTimeline();
      requestAnimationFrame(() => setup());
    });

    roRef.current.observe(container);
    roRef.current.observe(track);

    return () => {
      roRef.current?.disconnect();
      destroyTimeline();
    };
  }, [setup, destroyTimeline, dupCount]);

  useEffect(() => {
    if (!tlRef.current || !Number.isFinite(speed) || speed <= 0) return;
    const ratio = speed / baseSpeedRef.current;
    gsap.to(tlRef.current, {
      timeScale: ratio,
      duration: 0.25,
      ease: "power1.out",
    });
  }, [speed]);

  const onTrackEnter = pauseOnHoverTrack
    ? () =>
        tlRef.current &&
        gsap.to(tlRef.current, { timeScale: hoverTimeScale, duration: 0.2 })
    : undefined;
  const onTrackLeave = pauseOnHoverTrack
    ? () =>
        tlRef.current &&
        gsap.to(tlRef.current, { timeScale: 1, duration: 0.25 })
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`gm-container ${className}`}
      style={{ overflow: "hidden", width: "100%", position: "relative" }}
      {...rest}
    >
      <div
        ref={trackRef}
        className="gm-track"
        onMouseEnter={onTrackEnter}
        onMouseLeave={onTrackLeave}
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          willChange: "transform",
          alignItems: "center",
        }}
      >
        {segments}
      </div>
    </div>
  );
};

export default GsapMarquee;
