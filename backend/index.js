addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if(pathname.startsWith("/auth")) {
    if(pathname.startsWith("/auth/signup")) {
      return registerUser(request);
    }
    else if(pathname.startsWith("/auth/signin")) {
      return authenticateUser(request);
    }
    else {
      return new Response( `${pathname} not found`,  { status : 404 })
    }
  }
  else if(pathname.startsWith("/posts")) {
    if(request.method === "GET") {
      return getPosts(request);
    }
    else if(request.method === "POST") {
      return createPost(request);
    }
    else {
      return new Response( `Method not found`,  { status : 404 })
    }
  }
  else {
    return new Response( `${pathname} not found`,  { status : 404 })
  }
}


//services
// register users to the social media
async function registerUser(request) {
  var body = await request.json();

  if(body.username === undefined || body.passHash) {
    return new Response("cannot sign up user - bad request", {status : 400});
  }

  var prev = await users.get(body.username);

  if(prev != null) {
    return new Response("username already exists", {status : 429});
  }

  try {
    await users.put(body.username, body.passHash);
    return new Response("register user request", {status : 200});
  }
  catch(e) {
    return new Response("cannot register user request - upload to kv failed", {status : 500});
  }
}

// sign in users
async function authenticateUser(request){
  var body = await request.json();

  if(body.username === undefined || body.passHash === undefined) {
    return new Response("cannot sign up user - bad request", {status : 400});
  }

  var prev = await users.get(body.username);

  if(JSON.parse(prev).passHash != body.passHash) {
    return new Response("cannot sign in - check username/password", {status : 401});
  }

  return new Response("user authenticated", {status : 200});
}

// return the media posts
async function getPosts(request){
  try {
    var postList = await posts.list();

    var keys = postList.keys;
    var allposts = []

    for(let i = 0; i < postList.keys.length; ++i) {
      var entry = await posts.get(postList.keys[i].name.toString())
      allposts.push(JSON.parse(entry));
    }

    return new Response(JSON.stringify(allposts), {status : 200});
  }
  catch(e) {
    return new Response(JSON.stringify(e), {status : 500});
  }
}

// create a post
async function createPost(request) {
  var body = await request.json();

  if (body.title === undefined || body.username === undefined || body.content === undefined) {
    return new Response("cannot create post - bad request", { status: 400 });
  }

  var post = {}
  post.uuid = uuidv4();
  post.title = body.title
  post.username = body.username;
  post.created_at = Date.now().toString();

  if (typeof body.content === "string") {
    post.content = body.content
  } else {
    post.content.caption = body.content.text;
    post.content.imgBase64 = body.content.img;
  }

  try {
    await posts.put(post.uuid, JSON.stringify(post));
    return new Response("create post", { status: 200 });
  }
  catch(e) {
    return new Response(JSON.stringify(e), {status : 500});
  }
}
