export function RotatingGroup({ children, duration = 140 }: {
  children: React.ReactNode;
  duration?: number;
}) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 0 0"
        to="360 0 0"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

export function RotateToFollowSun({ children, duration = 50 }: {
  children: React.ReactNode;
  duration?: number;
}) {
  return <RotatingGroup duration={duration} children={children}/>;
}

export function Jiggle({ children, angle = 5, duration = 0.4 }: {
  children: React.ReactNode;
  angle?: number;
  duration?: number;
}) {
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`
          ${-angle} 0 0;
          ${angle} 0 0;
          ${-angle} 0 0
        `}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}