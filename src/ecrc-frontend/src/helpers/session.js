export function getOrg() {
  return JSON.parse(sessionStorage.getItem("org"));
}

export function setOrg(org) {
  sessionStorage.setItem("org", JSON.stringify(org));
}

export function clearOrg() {
  sessionStorage.removeItem("org");
}

export function getApplicant() {
  return JSON.parse(sessionStorage.getItem("applicant"));
}

export function setApplicant(applicant) {
  sessionStorage.setItem("applicant", JSON.stringify(applicant));
}

export function clearApplicant() {
  sessionStorage.removeItem("applicant");
}
