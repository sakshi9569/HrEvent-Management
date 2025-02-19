import api from "./api";

const apiCall = async (method, url, data = null, token = null) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  try {
    let response;
    if (method === "get") {
      response = await api.get(url, config);
    } else if (method === "post") {
      response = await api.post(url, data, config);
    } else if (method === "put") {
      response = await api.put(url, data, config);
    } else if (method === "delete") {
      response = await api.delete(url, config);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "An error occurred";
  }
};

export const loginUser = async (data) => {
  return apiCall("post", "/user/login", data);
};

export const signupUser = async (data) => {
  return apiCall("post", "/user/signup", data);
};

// User Dashboard APIs
export const fetchUserInvites = async (userId, token) => {
  return apiCall("get", `/user/${userId}/invites`, null, token);
};

export const fetchUserPendingInvites = async (userId, token) => {
  return apiCall("get", `/user/${userId}/invites/pending`, null, token);
};

export const fetchProposedEvents = async (userId, token) => {
  return apiCall("get", `/user/${userId}/proposedEventsAll`, null, token);
};
export const fetchProposedEventsForAdmin = async (token) => {
  return apiCall("get", `user/proposedEvents/all`, null, token);
};
export const proposeEvent = async (userId, eventData, token) => {
  return apiCall("post", `/user/${userId}/events/propose`, eventData, token);
};

export const respondToInvite = async (
  userId,
  eventId,
  action,
  remarks,
  token
) => {
  const data = { userAction: action, userRemarks: remarks };
  return apiCall(
    "post",
    `/user/${userId}/invites/${eventId}/respond`,
    data,
    token
  );
};

// Admin Dashboard APIs
export const fetchAllEvents = async (token) => {
  return apiCall("get", "/user/event/all", null, token);
};

export const createEvent = async (eventData, token) => {
  return apiCall("post", "/user/event/create", eventData, token);
};

export const modifyEvent = async (eventId, updatedEvent, token) => {
  return apiCall("put", `/user/event/${eventId}/modify`, updatedEvent, token);
};

export const addInviteesToEvent = async (eventId, inviteesList, token) => {
  return apiCall(
    "post",
    `/user/event/${eventId}/add-invitees`,
    inviteesList,
    token
  );
};

export const handleProposalAction = async (eventId, action, token) => {
  const data = { action, remark: "ok" };
  return apiCall("post", `/user/proposal/${eventId}/action`, data, token);
};

export const fetchEventInvites = async (eventId, token) => {
  return apiCall("get", `/user/event/${eventId}/allInvitees`, null, token);
};

