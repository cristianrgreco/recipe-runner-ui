import React from "react";
import { action } from "@storybook/addon-actions";
import ToggleButton from "../components/ToggleButton";
import NotificationBadge from "../components/NotificationBadge";

export default {
  title: "Notification Badge",
};

export const standard = () => <NotificationBadge value={1} />;

export const many = () => <NotificationBadge value={100} />;
