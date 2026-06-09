// Heuristic phishing / scam detector. Works on URLs OR free-text messages.
// Returns a risk score 0-100 and a list of human-readable reasons.

export type RiskLevel = "safe" | "suspicious" | "dangerous";

export interface PhishingResult {
  score: number;
  level: RiskLevel;
  reasons: string[];
  matchedUrls: string[];
}

const SUSPICIOUS_TLDS = [".zip", ".mov", ".xyz", ".top", ".tk", ".ml", ".ga", ".cf", ".gq", ".click", ".country", ".rest", ".work"];
const URL_SHORTENERS = ["bit.ly", "tinyurl.com", "goo.gl", "t.co", "ow.ly", "is.gd", "buff.ly", "cutt.ly", "rebrand.ly", "shorturl.at"];
const BRAND_KEYWORDS = ["paypal", "apple", "amazon", "microsoft", "google", "facebook", "instagram", "netflix", "bank", "hsbc", "chase", "wellsfargo", "outlook", "office365", "icloud", "dhl", "fedex", "ups", "irs", "hmrc", "linkedin", "whatsapp"];
const URGENCY_PHRASES = [
  "verify your account", "verify now", "account suspended", "account locked",
  "unusual activity", "click here immediately", "act now", "limited time",
  "your password has expired", "confirm your identity", "update your billing",
  "you have won", "congratulations you won", "claim your prize", "free gift",
  "tax refund", "wire transfer", "gift card", "bitcoin", "crypto investment",
  "send me your", "urgent action required", "final warning", "within 24 hours",
];
const CREDENTIAL_PHRASES = ["password", "ssn", "social security", "credit card", "cvv", "otp", "one-time code", "pin number", "login credentials", "seed phrase", "recovery phrase"];

const URL_REGEX = /\b((?:https?:\/\/|www\.)[^\s<>"']+|\b[a-z0-9-]+\.(?:com|net|org|io|co|info|biz|app|dev|me|us|uk|in|ru|cn|de)(?:\/[^\s<>"']*)?)/gi;
const IP_URL_REGEX = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i;

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

export function analyzeContent(input: string): PhishingResult {
  const reasons: string[] = [];
  const matchedUrls: string[] = [];
  let score = 0;

  const text = (input || "").trim();
  if (!text) {
    return { score: 0, level: "safe", reasons: ["Empty input"], matchedUrls: [] };
  }

  const lower = text.toLowerCase();

  // URL extraction
  const urls = Array.from(text.matchAll(URL_REGEX)).map((m) => m[0]);
  urls.forEach((u) => matchedUrls.push(u));

  // IP-based URL
  if (IP_URL_REGEX.test(text)) {
    score += 35;
    reasons.push("Link uses a raw IP address instead of a domain name.");
  }

  for (const url of urls) {
    const clean = url.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
    const host = clean.split("/")[0].toLowerCase();

    // Suspicious TLD
    if (SUSPICIOUS_TLDS.some((tld) => host.endsWith(tld))) {
      score += 20;
      reasons.push(`Suspicious top-level domain detected: ${host}`);
    }

    // URL shortener
    if (URL_SHORTENERS.some((s) => host === s || host.endsWith("." + s))) {
      score += 20;
      reasons.push(`Shortened URL hides the real destination: ${host}`);
    }

    // Excessive subdomains
    const parts = host.split(".");
    if (parts.length >= 5) {
      score += 15;
      reasons.push(`Too many subdomains (${parts.length}) — often used to fake brands.`);
    }

    // Brand impersonation via typosquatting
    const root = parts.slice(-2, -1)[0] ?? "";
    for (const brand of BRAND_KEYWORDS) {
      if (root === brand) continue;
      if (root.includes(brand) && root !== brand) {
        score += 25;
        reasons.push(`Domain "${root}" embeds the brand "${brand}" — likely impersonation.`);
        break;
      }
      if (root.length > 3 && levenshtein(root, brand) === 1) {
        score += 30;
        reasons.push(`Domain "${root}" is a one-letter lookalike of "${brand}".`);
        break;
      }
    }

    // Punycode / unicode tricks
    if (host.includes("xn--")) {
      score += 25;
      reasons.push("Punycode domain (xn--) — may visually fake a known brand.");
    }

    // Mixed protocol
    if (/^http:\/\//i.test(url) && BRAND_KEYWORDS.some((b) => host.includes(b))) {
      score += 10;
      reasons.push("Insecure http:// link to a sensitive brand.");
    }

    // @ in URL
    if (url.includes("@") && !/^mailto:/i.test(url)) {
      score += 20;
      reasons.push("URL contains '@' — may redirect to a different host.");
    }
  }

  // Urgency / scam phrases
  const urgencyHits = URGENCY_PHRASES.filter((p) => lower.includes(p));
  if (urgencyHits.length) {
    score += Math.min(30, urgencyHits.length * 10);
    reasons.push(`Pressure/scam language: "${urgencyHits.slice(0, 3).join('", "')}"`);
  }

  // Credential requests
  const credHits = CREDENTIAL_PHRASES.filter((p) => lower.includes(p));
  if (credHits.length) {
    score += Math.min(25, credHits.length * 12);
    reasons.push(`Requests sensitive information: "${credHits.slice(0, 3).join('", "')}"`);
  }

  // Generic greeting
  if (/\b(dear (customer|user|client|valued member))\b/i.test(text)) {
    score += 10;
    reasons.push("Generic greeting (no real name) — common in mass phishing.");
  }

  // Money / currency lures
  if (/\$\d{2,}|\b(usd|eur|btc|inr)\s?\d+/i.test(text)) {
    score += 8;
    reasons.push("Mentions money amounts — common in scam lures.");
  }

  // Attachment lure
  if (/\b(invoice|receipt|statement|document)\.(zip|exe|scr|rar|html)\b/i.test(lower)) {
    score += 25;
    reasons.push("Suspicious attachment extension.");
  }

  // Excessive capitalization
  const caps = (text.match(/[A-Z]/g) || []).length;
  if (text.length > 40 && caps / text.length > 0.4) {
    score += 8;
    reasons.push("Excessive capitalization — common scam style.");
  }

  if (!reasons.length) reasons.push("No common phishing indicators detected.");

  score = Math.max(0, Math.min(100, score));
  const level: RiskLevel = score >= 60 ? "dangerous" : score >= 25 ? "suspicious" : "safe";

  return { score, level, reasons, matchedUrls };
}
