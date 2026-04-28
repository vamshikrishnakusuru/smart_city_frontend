import api, { extractApiData } from "./api";

export async function createIssue(issueData) {
  const response = await api.post("/api/issues", issueData);
  return extractApiData(response);
}

export async function getMyIssues(page = 0, size = 20) {
  const response = await api.get("/api/issues/my", {
    params: { page, size },
  });
  return extractApiData(response);
}

export async function getAllIssues(page = 0, size = 50) {
  const response = await api.get("/api/admin/issues", {
    params: { page, size },
  });
  return extractApiData(response);
}

export async function getIssuesByCity(city, page = 0, size = 50) {
  const response = await api.get(`/api/admin/issues/city/${encodeURIComponent(city)}`, {
    params: { page, size },
  });
  return extractApiData(response);
}

export async function updateIssueStatus(issueId, status) {
  const response = await api.put(`/api/admin/issues/${issueId}/status`, {
    status,
  });
  return extractApiData(response);
}
