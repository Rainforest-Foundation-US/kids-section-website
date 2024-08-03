interface BadgeProps {
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps) {
  return (
    <div className="rounded-full border-2 border-neutral-dark-100 bg-neutral-dark-400 p-3">
      {props.children}
    </div>
  );
}
