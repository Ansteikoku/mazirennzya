const SUPABASE_URL = "https://hfaammdbcoxympbtfwql.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

if (!localStorage.getItem("wakakusa_logged_in")) location.href = "login.html";

function logout() {
  localStorage.removeItem("wakakusa_logged_in");
  location.href = "login.html";
}

let boards = [];
let selectedBoardId = null;

async function loadBoards() {
  const { data } = await supabase.from("boards").select("*");
  boards = data;
  const select = document.getElementById("boardSelect");
  data.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name;
    select.appendChild(opt);
  });
  if (data.length > 0) {
    selectedBoardId = data[0].id;
    select.value = selectedBoardId;
    select.onchange = () => {
      selectedBoardId = select.value;
      loadThreads();
    };
    loadThreads();
  }
}

async function loadThreads() {
  const { data } = await supabase.from("threads").select("*").eq("board_id", selectedBoardId).order("created_at", { ascending: false });
  const list = document.getElementById("threadList");
  list.innerHTML = data.map(t =>
    `<div class="res"><a href="thread.html?id=${t.id}">${t.content}</a></div>`
  ).join("") || "スレッドがありません";
}

async function createThread() {
  const name = document.getElementById("name").value || "名無しさん";
  const content = document.getElementById("content").value.trim();
  if (!content) return alert("本文を入力してください");
  const { error } = await supabase.from("threads").insert([{ name, content, board_id: selectedBoardId }]);
  if (error) return alert("投稿に失敗しました");
  loadThreads();
}

loadBoards();