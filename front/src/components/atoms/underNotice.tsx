export function UnderNoticeAtom({ condition, children }: { condition?: boolean; children: any }) {
  return <div>{condition && <p>{children}</p>}</div>
}
