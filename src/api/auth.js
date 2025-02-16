import api from "./api";

// Auth APIs
export const loginUser = async (data) => {
  const response = await api.post("/user/login", data);
  return response.data;
};

export const signupUser = async (data) => {
  const response = await api.post("/user/signup", data);
  return response.data;
};

// User Dashboard APIs
export const fetchUserInvites = async (userId, token) => {
  const response = await api.get(`/user/${userId}/invites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUserPendingInvites = async (userId, token) => {
  const response = await api.get(`/user/${userId}/invites/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchProposedEvents = async (token) => {
  const response = await api.get("/user/proposedEvents/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const proposeEvent = async (userId, eventData, token) => {
  const response = await api.post(`/user/${userId}/events/propose`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const respondToInvite = async (userId, eventId, action, remarks, token) => {
  const response = await api.post(
    `/user/${userId}/invites/${eventId}/respond`,
    { userAction: action, userRemarks: remarks },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Admin Dashboard APIs
export const fetchAllEvents = async (token) => {
  const response = await api.get("/user/event/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createEvent = async (eventData, token) => {
  const response = await api.post("/user/event/create", eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const modifyEvent = async (eventId, updatedEvent, token) => {
  const response = await api.put(`/user/event/${eventId}/modify`, updatedEvent, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addInviteesToEvent = async (eventId, inviteesList, token) => {
  const response = await api.post(`/user/event/${eventId}/add-invitees`, inviteesList, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const handleProposalAction = async (eventId, action, token) => {
  const response = await api.post(
    `/user/proposal/${eventId}/action`,
    { action, remark: "ok" },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};