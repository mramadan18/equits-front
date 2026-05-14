import { DriveStep } from "driver.js";

export const HOME_TOUR_STEPS: DriveStep[] = [
  {
    element: "#navbar-pitch-button",
    popover: {
      title: "Start Your Pitch",
      description:
        "Click here to start creating your project or idea. Don't worry about finishing in one go!",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "#navbar-pitch-button",
    popover: {
      title: "Draft System",
      description:
        "You can exit anytime and return to your profile to complete your draft. Every step you complete is automatically saved.",
      side: "bottom",
      align: "end",
    },
  },
  {
    element: "#home-search-bar",
    popover: {
      title: "Search Projects",
      description:
        "Find your next big opportunity by searching through our curated list of projects.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#explore-filters",
    popover: {
      title: "Refine Your Feed",
      description:
        "Use these filters to narrow down projects by industry, stage, or funding requirements.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#feed-profile-card",
    popover: {
      title: "Your Profile Summary",
      description:
        "Quick access to your profile status and completion progress.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#people-may-need",
    popover: {
      title: "Suggested Talents",
      description:
        "We suggest professionals and partners that might be a great fit for your projects.",
      side: "left",
      align: "start",
    },
  },
];

export const PROJECT_DETAILS_TOUR_STEPS: DriveStep[] = [
  {
    element: "#project-header",
    popover: {
      title: "Project Overview",
      description: "Basic info, tagline, and the project owner.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#project-metrics",
    popover: {
      title: "Key Metrics",
      description:
        "Check the growth and performance indicators for this project.",
      side: "top",
      align: "start",
    },
  },
  {
    element: "#project-action-sidebar",
    popover: {
      title: "Take Action",
      description:
        "Interested? You can invest, contact, or follow the project from here.",
      side: "left",
      align: "start",
    },
  },
  {
    element: "#project-request-meeting-button",
    popover: {
      title: "Direct Collaboration",
      description:
        "Send a formal meeting request to the project owner. They will be notified via email and in-app dashboard. To ensure serious inquiries, we implement a 24-hour cooldown between requests.",
      side: "left",
      align: "center",
    },
  },
];

export const TALENTS_TOUR_STEPS: DriveStep[] = [
  {
    element: "#talents-search-bar",
    popover: {
      title: "Find Your Team",
      description:
        "Search for specific roles, skills, or names to find the perfect match for your project.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#talents-filters",
    popover: {
      title: "Advanced Search",
      description:
        "Filter by experience level, city, or university to narrow down your search.",
      side: "bottom",
      align: "start",
    },
  },
  {
    element: "#talents-request-meeting",
    popover: {
      title: "Professional Connection",
      description:
        "Send a formal request for a video meeting. The talent will receive an email and in-app notification. Note: You can only request one meeting per 24 hours to ensure quality connections.",
      side: "top",
      align: "center",
    },
  },
];
