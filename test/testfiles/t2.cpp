i18n_test1    = ResBundleAdaptor::Instance().getLocString("You're\n Welcome.");
i18n_test2     = ResBundleAdaptor::Instance().getLocString("No,\n \t Thanks.");
i18n_test3    = ResBundleAdaptor::Instance().getLocString("Yes \"yes\".");
if (pResBundle) {
    trans1 = pResBundle->getLocString("Do you want to change the settings from \'Digital Sound Output\' to \'Pass Through\' to minimize audio delay while playing game?");
}