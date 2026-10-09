import { StateCreator } from "zustand";

export type AnnouncementBannerStore = {
  showAnnouncementBanner: boolean;
  setShowAnnouncementBanner: (showAnnouncementBanner: boolean) => void;
};

export const createAnnouncementBannerStore: StateCreator<
  AnnouncementBannerStore
> = (set) => ({
  showAnnouncementBanner: true,
  setShowAnnouncementBanner: (showAnnouncementBanner: boolean) =>
    set(() => ({
      showAnnouncementBanner,
    })),
});
