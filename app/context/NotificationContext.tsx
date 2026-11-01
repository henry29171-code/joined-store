// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";
// import { Snackbar, Alert, AlertColor } from "@mui/material";

// type NotificationState = {
//   open: boolean;
//   message: string;
//   severity: AlertColor; // "success" | "info" | "warning" | "error"
// };

// type NotificationContextValue = {
//   notify: (message: string, severity?: AlertColor) => void;
// };

// const NotificationContext = createContext<NotificationContextValue | null>(
//   null
// );

// export function NotificationProvider({ children }: { children: ReactNode }) {
//   const [state, setState] = useState<NotificationState>({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const notify = (message: string, severity: AlertColor = "info") => {
//     setState({ open: true, message, severity });
//   };

//   const handleClose = () => {
//     setState((prev) => ({ ...prev, open: false }));
//   };

//   return (
//     <NotificationContext.Provider value={{ notify }}>
//       {children}
//       {/* The actual toast UI, mounted once at the root */}
//       <Snackbar
//         open={state.open}
//         autoHideDuration={2500}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleClose}
//           severity={state.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {state.message}
//         </Alert>
//       </Snackbar>
//     </NotificationContext.Provider>
//   );
// }

// export function useNotification() {
//   const ctx = useContext(NotificationContext);
//   if (!ctx)
//     throw new Error("useNotification must be used within NotificationProvider");
//   return ctx;
// }
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type Notification = {
  id: number;
  message: string;
  severity: AlertColor; // "success" | "info" | "warning" | "error"
};

type NotificationContextValue = {
  notify: (message: string, severity?: AlertColor) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, severity: AlertColor = "info") => {
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(), // simple unique id
        message,
        severity,
      },
    ]);
  };

  const handleClose = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      {notifications.map((n, index) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={2500}
          onClose={() => handleClose(n.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{
            paddingBottom: 6,
            "& .MuiPaper-root": { animation: "popIn 0.2s ease-out" },
          }}
          // Small offset so they visually stack upward
          style={{ marginBottom: index * 72 }}
        >
          <Alert
            onClose={() => handleClose(n.id)}
            severity={n.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
