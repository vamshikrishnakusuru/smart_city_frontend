import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { extractApiMessage } from "../services/api";
import {
  createIssue as createIssueRequest,
  getAllIssues,
  getIssuesByCity,
  getMyIssues,
  updateIssueStatus as updateIssueStatusRequest,
} from "../services/issueService";

const IssueContext = createContext();

export function IssueProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshIssues = useCallback(async () => {
    if (!user) {
      setIssues([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const pageData =
        user.role === "admin"
          ? await getIssuesByCity(user.city)
          : await getMyIssues();

      setIssues(pageData?.content ?? []);
    } catch (apiError) {
      setError(extractApiMessage(apiError, "Unable to load issues"));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      refreshIssues();
    }
  }, [authLoading, refreshIssues]);

  const addIssue = async (issueData) => {
    try {
      const createdIssue = await createIssueRequest(issueData);
      setIssues((prev) => [createdIssue, ...prev]);
      return createdIssue;
    } catch (apiError) {
      throw new Error(extractApiMessage(apiError, "Unable to create issue"));
    }
  };

  const loadAllIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const pageData = await getAllIssues();
      setIssues(pageData?.content ?? []);
    } catch (apiError) {
      setError(extractApiMessage(apiError, "Unable to load admin issues"));
    } finally {
      setLoading(false);
    }
  };

  const updateIssueStatus = async (issueId, status) => {
    try {
      const updatedIssue = await updateIssueStatusRequest(issueId, status);
      setIssues((prev) =>
        prev.map((issue) => (issue.id === issueId ? updatedIssue : issue))
      );
      return updatedIssue;
    } catch (apiError) {
      throw new Error(
        extractApiMessage(apiError, "Unable to update issue status")
      );
    }
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        loading,
        error,
        refreshIssues,
        addIssue,
        loadAllIssues,
        updateIssueStatus,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  return useContext(IssueContext);
}
