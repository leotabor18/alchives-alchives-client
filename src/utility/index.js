export const createNavigationBarMenu = (name, path, icon) => {
  return {
    name,
    path,
    icon
  }
}

export const createAlumniData = (id, studentNumber, name, program, batchYear) => {
  return {
    id,
    studentNumber,
    name,
    program,
    batchYear
  };
}

export const createEventData = (id, eventName, eventVenue, eventDate, batchYear) => {
  return {
    id,
    eventName,
    eventVenue,
    eventDate,
    batchYear
  };
}

export const createProgramData = (id, name, institute) => {
  return {
    id,
    name,
    institute
  };
}

export const createPersonnelData = (id, name, position, department) => {
  return {
    id,
    fullName: name,
    position,
    department,
  };
}
export const createUserData = (id, name, email, role) => {
  return {
    id,
    fullName: name,
    email,
    role
  };
}

export const createInstituteData = (id, name) => {
  return {
    id,
    name
  };
}

export const createHeadCells =  (id, numeric, label, primaryHeader, isSort) => {
  return {
    id: id,
    numeric: numeric,
    disablePadding: false,
    primaryHeader: primaryHeader,
    label: label,
    isSort
  }
}


export const getLocalStorageItem = (storageKey) => {
  const savedState = localStorage.getItem(storageKey);
  try {
    if (!savedState) {
      return undefined;
    }
    return JSON.parse(savedState ?? '{}');
  } catch (e) {
    return undefined;
  }
}

export const setLocalStorageItem = (storageKey, state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export const isTokenExpired = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const data = JSON.parse(jsonPayload);
  const expirationDate = data.exp;
  const currentDate = new Date().getTime() / 1000;
  return currentDate >= expirationDate;
}

export const getBatchYear = (givenYear) => {
  const currentYear = new Date().getFullYear();
  let years = [];

  for (let year = givenYear; year <= currentYear; year++) {
    years.push({ 
     name: year.toString(),
    });
  }

  return years;
}
