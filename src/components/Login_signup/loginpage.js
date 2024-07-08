import React from "react";
<section>
{!token ? (
  <>
    <Signup setToken={setToken} />
    <Login setToken={setToken} />
  </>
) : (
  <p>Welcome! You are logged in.</p>
)}

</section>