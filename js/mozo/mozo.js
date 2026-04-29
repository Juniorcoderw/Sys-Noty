const config_firebase = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config_firebase)
}

const auth_app = firebase.auth()
const db_app = firebase.database()
const lista_alertas = document.getElementById("lista-alertas")
const mozo_id = document.getElementById("mozo-id")
const btn_salir = document.getElementById("btn-salir")

function alerta_ver(alerta_txt) {
  const item_li = document.createElement("li")
  item_li.textContent = alerta_txt
  lista_alertas.prepend(item_li)
}

function alerta_push(alerta_txt) {
  if (navigator.vibrate) navigator.vibrate([200, 100, 200])
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("NotiFast", { body: alerta_txt })
  }
}

auth_app.onAuthStateChanged(async (usr_app) => {
  if (!usr_app) {
    window.location.href = "../index.html"
    return
  }

  const uid_usr = usr_app.uid
  mozo_id.textContent = `Mozo: ${uid_usr}`

  if ("Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission()
  }

  db_app.ref(`alertas/${uid_usr}`).on("child_added", (snap_app) => {
    const datos_app = snap_app.val()
    const alerta_txt = datos_app.alerta_txt
    alerta_ver(alerta_txt)
    alerta_push(alerta_txt)
  })
})

btn_salir.addEventListener("click", async () => {
  await auth_app.signOut()
  window.location.href = "../index.html"
})
