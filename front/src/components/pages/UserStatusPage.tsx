export default function UserStatusPage({ user }: any) {
  const id = user?.id;
  const email = user?.email;
  const name = user?.name;
  return (
    <div>
      <h1>상태: {user == null ? "로그아웃" : "로그인"}</h1>
      {user && (
        <div>
          <p>id: {id}</p>
          <p>email: {email}</p>
          <p>name: {name}</p>
        </div>
      )}
    </div>
  );
}
