const SUPABASE_URL = "https://hfaammdbcoxympbtfwql.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

if (!localStorage.getItem("wakakusa_logged_in")) location.href = "login.html";

function logout() {
  localStorage.removeItem("wakakusa_logged_in");
  location.href = "login.html";
}

// 以下、index.htmlとthread.htmlで分岐処理など追加実装する場合あり