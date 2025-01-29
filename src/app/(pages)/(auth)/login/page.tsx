export default function LoginPage() {
  return (
    <div className="container justify-items-center">
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <br></br>
        <input type="password" placeholder="Password" />
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}