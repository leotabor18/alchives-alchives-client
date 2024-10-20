const API_BASE_PATH = window.API_BASE_PATH;

const api = {
  RESET_PASSWORD         : `${API_BASE_PATH}/auth/reset-password`,
  LOGIN                  : `${API_BASE_PATH}/public/login`,
  NEW_PASSWORD           : `${API_BASE_PATH}/auth/new-password`,
  ADMINISTRATORS_BY_TOKEN: `${API_BASE_PATH}/auth/search/findByToken`,
  EVENTS                 : `${API_BASE_PATH}/events`,
  EVENT                  : `${API_BASE_PATH}/event`,
  USERS_BY_TOKEN         : `${API_BASE_PATH}/auth/user`,
  ALUMNIS_API             : `${API_BASE_PATH}/alumnis`,
  ALUMNI_API             : `${API_BASE_PATH}/alumni`,
  ALUMNI_QUERY_API       : `${API_BASE_PATH}/alumnis/search/findByBatchYearAndProgramName`,
  ALUMNI_SEARCH_API       : `${API_BASE_PATH}/alumnis/search/findByFirstNameContainingOrLastNameContaining`,
  PUBLIC_ALUMNI_API      : `${API_BASE_PATH}/public/alumni`,
  PUBLIC_INSTITUTES_API  : `${API_BASE_PATH}/public/institutes`,
  INSTITUTES_API  : `${API_BASE_PATH}/institutes`,
  PUBLIC_PROGRAMS_API  : `${API_BASE_PATH}/public/programs`,
  USER_API               : `${API_BASE_PATH}/users`,
  PROGRAMS_API            : `${API_BASE_PATH}/programs`,
  PERSONNELS_API         : `${API_BASE_PATH}/personnels`,
  PERSONNEL_API         : `${API_BASE_PATH}/personnel`,
  PROGRAM_API            : `${API_BASE_PATH}/program`,
  PROGRAM_SEARCH_API     : `${API_BASE_PATH}/programs/search/findByNameContaining`,
};

export default api;