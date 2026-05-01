export function RotatingRingGroup({ children, duration = 140 }: {
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

export function RotatingViaSunGroup({ children }: {
  children: React.ReactNode;
  duration?: number;
}) {
  const duration = 2000;
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 0 0"
        to="-360 0 0"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

