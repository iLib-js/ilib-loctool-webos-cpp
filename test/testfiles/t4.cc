void Localization::SetLocale(const std::string& locale) {
  PMLOG_DEBUG("[Localization] locale[%s]", locale.c_str());

  std::unique_ptr<ResBundle> res_bundle(
      new ResBundle(locale, std::string(kResFile), std::string(kResPath)));

  if (!res_bundle)
    return;

  translations_[kBookmarksStr] = res_bundle->getLocString("Bookmarks");
  translations_[kMostVisitedStr] =
      res_bundle->getLocString("Most Visited Sites");
  translations_[kRecommendedStr] =
      res_bundle->getLocString("Recommended Sites");
  translations_[kGuideButtonStr] = res_bundle->getLocString("Go to Settings");
  translations_[kGuideTitleStr] =
      res_bundle->getLocString("Change Internet Settings");
}