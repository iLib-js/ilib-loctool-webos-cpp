if (nlp_supported) {
    i18n_msg = ResBundleAdaptor::Instance().getLocString("Voice recognition will be available by connecting TV to the network.") + "<br>\"" +
    ResBundleAdaptor::Instance().getLocString("Channel 20 (channel number)") + "\"<br>\"" +
    ResBundleAdaptor::Instance().getLocString("Volume up/down") + "\"<br>\"" +
    ResBundleAdaptor::Instance().getLocString("Brighten/dim the screen") + "\"<br>\"" +
    ResBundleAdaptor::Instance().getLocString("Search 'OOO(search keyword)' on YouTube") + "\"<br>\"" +
    ResBundleAdaptor::Instance().getLocString("Recommend me something to watch") + "\"<br>\"" +
    ResBundleAdaptor::Instance().getLocString("Switch to \"the game\" console") + "\"";

    i18n_yes    = ResBundleAdaptor::Instance().getLocString("Network settings");
    i18n_no     = ResBundleAdaptor::Instance().getLocString("Cancel");
} else {
    i18n_msg = ResBundleAdaptor::Instance().getLocString("Network is not connected. Do you want to go to Network Settings now to check the connection?");

    i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes");
    i18n_no     = ResBundleAdaptor::Instance().getLocString("No");
    i18n_yesyes    = ResBundleAdaptor::Instance().getLocString("Yes");
}