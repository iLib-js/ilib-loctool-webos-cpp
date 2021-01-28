/*
 * testCppFile.js - test the C++ file handler object.
 *
 * Copyright © 2020-2021, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (!CppFile) {
    var CppFile = require("../CppFile.js");
    var CppFileType = require("../CppFileType.js");
    var CustomProject =  require("loctool/lib/CustomProject.js");
}

var p = new CustomProject({
    id: "app",
    plugins: ["../."],
    sourceLocale: "en-US"
}, "./test/testfiles", {
    locales:["en-GB"]
});

var cppft = new CppFileType(p);

module.exports.cppfile = {
    testCppFileConstructor: function(test) {
        test.expect(1);

        var cppf = new CppFile({project: p});
        test.ok(cppf);
        test.done();
    },

    testCppFileConstructorParams: function(test) {
        test.expect(1);

        var cppf = new CppFile({
            project: p,
            pathName: "./testfiles/t1.cpp",
            type: cppft
        });

        test.ok(cppf);
        test.done();
    },

    testCppFileConstructorNoFile: function(test) {
        test.expect(1);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);
        test.done();
    },

    testCppFileMakeKey: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);
        test.equal(cppf.makeKey("This is a test"), "This is a test");
        test.done();
    },

    testCppFileMakeKey2: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);
        test.equal(cppf.makeKey("This is a \t\"test\""), "This is a \t\"test\"");
        test.done();
    },

    testCppFileMakeKeyWithSpace: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);
        test.equal(cppf.makeKey(" This is a test "), " This is a test ");
        test.done();
    },

    testCppFileMakeKeyWithSpaces: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);
        test.equal(cppf.makeKey("   This is a test   "), "   This is a test   ");
        test.done();
    },

    testCppFileParseSimpleGetByKey: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Yes");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Yes"
        });
        test.ok(r);

        test.equal(r[0].getSource(), "Yes");
        test.equal(r[0].getKey(), "Yes");

        test.done();
    },

    testCppFileParseSimpleGetBySource: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Yes");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");

        test.done();
    },

    testCppFileParseSimpleGetBySourceWithSpace: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('ResBundleAdaptor::Instance().getLocString(" Yes ");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource(" Yes ");
        test.ok(r);
        test.equal(r.getSource(), " Yes ");
        test.equal(r.getKey(), " Yes ");

        test.done();
    },

    testCppFileParseSimpleGetBySourceWithSpaces: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('ResBundleAdaptor::Instance().getLocString("     Yes   ");');


        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("     Yes   ");
        test.ok(r);
        test.equal(r.getSource(), "     Yes   ");
        test.equal(r.getKey(), "     Yes   ");

        test.done();
    },

    testCppFileParseCppSimple: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_msg = ResBundleAdaptor::Instance().getLocString("Yes");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");

        test.done();
    },

    testCppFileParseCppSimple2: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Try again.");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Try again.");
        test.ok(r);
        test.equal(r.getSource(), "Try again.");
        test.equal(r.getKey(), "Try again.");

        test.done();
    },

    testCppFileParseMoreComplex: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('ResBundleAdaptor::Instance().getLocString("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");  // i18n // photovideo-22');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.ok(r);
        test.equal(r.getSource(), "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.equal(r.getKey(), "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.equal(r.getComment(), "photovideo-22");
        test.done();
    },

    testCppFileParseSimpleWithTranslatorComment: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n click button');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");
        test.equal(r.getComment(), "click button");

        test.done();
    },

    testCppFileParseSimpleWithTranslatorComment2: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); /* i18n Yes button for Bluray player */');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");
        test.equal(r.getComment(), "Yes button for Bluray player");

        test.done();
    },

    testCppFileParseSimpleWithTranslatorComment3: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n //  Yes button for Bluray player');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");
        test.equal(r.getComment(), "Yes button for Bluray player");

        test.done();
    },

    testCppFileParseSimpleWithTranslatorComment4: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n : Power button');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");
        test.equal(r.getComment(), "Power button");

        test.done();
    },

    testCppFileParseSimpleWithTranslatorComment5: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n  Connect WiSA Dongle');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");
        test.equal(r.getComment(), "Connect WiSA Dongle");

        test.done();
    },

    testCppFileParseSimpleWithTranslatorComment6: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n : GUIDE button for Set-top box, used in screen remote');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");
        test.equal(r.getComment(), "GUIDE button for Set-top box, used in screen remote");

        test.done();
    },

    testCppFileParseWithKey: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("PictureMode.Standard", "Standard");');
        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

        test.done();
    },

    testCppFileParseWithKey2: function(test) {
        test.expect(8);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");m_localeStringNo   = mp_resBundle->getLocString("NO.key", "NO");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "YES.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "YES");
        test.equal(r[0].getKey(), "YES.key");

        var r = set.getBy({
            reskey: "NO.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "NO");
        test.equal(r[0].getKey(), "NO.key");

        test.done();
    },

    testCppFileParseWithKeyandComment: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");   // i18n // photovideo-48');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "YES.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "YES");
        test.equal(r[0].getKey(), "YES.key");
        test.equal(r[0].getComment(), "photovideo-48");

        test.done();
    },

    testCppFileParseMultiple: function(test) {
        test.expect(8);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES"); m_localeStringNo   = mp_resBundle->getLocString("NO" );');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("YES");
        test.ok(r);
        test.equal(r.getSource(), "YES");
        test.equal(r.getKey(), "YES");

        r = set.getBySource("NO");
        test.ok(r);
        test.equal(r.getSource(), "NO");
        test.equal(r.getKey(), "NO");

        test.done();
    },

    testCppFileParseMultiple2: function(test) {
        test.expect(9);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES"); m_localeStringNo   = mp_resBundle->getLocString("NO" ); // i18n Detail description');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("YES");
        test.ok(r);
        test.equal(r.getSource(), "YES");
        test.equal(r.getKey(), "YES");

        r = set.getBySource("NO");
        test.ok(r);
        test.equal(r.getSource(), "NO");
        test.equal(r.getKey(), "NO");
        test.equal(r.getComment(), "Detail description");

        test.done();
    },

    testCppFileParseMultipleWithKey: function(test) {
        test.expect(10);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");  m_localeStringNo   = mp_resBundle->getLocString("NO.key", "NO"); m_bufStr = mp_resBundle->getLocString("Loading", "Buffering is in progress...");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "YES.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "YES");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "YES.key");

        r = set.getBy({
            reskey: "NO.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "NO");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "NO.key");

        test.done();
    },

    testCppFileParseWithDups: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");');
        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("YES");
        test.ok(r);
        test.equal(r.getSource(), "YES");
        test.equal(r.getKey(), "YES.key");

        test.equal(set.size(), 1);

        test.done();
    },

    testCppFileParseBogusNonStringParam: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString(YES); ');

        var set = cppf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },

    testCppFileParseEmptyParams: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString();');

        var set = cppf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },

    testCppFileParseWholeWord: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('m_localeStringYes  = mp_resBundle->ggetLocString();');

        var set = cppf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    },

    testCppFileParsePunctuationBeforeRB: function(test) {
        test.expect(12);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);
        cppf.parse('        \n'+
            '    if (nlp_supported) {\n' +
            '        i18n_msg = ResBundleAdaptor::Instance().getLocString("Voice recognition will be available by connecting TV to the network.") + "<br>\"" +\n' +
            '        ResBundleAdaptor::Instance().getLocString("Channel 20 (channel number)") + "\"<br>\"" \n' +
            '        ResBundleAdaptor::Instance().getLocString("Volume up/down") + "\"<br>\"" +\n' +
            '        ResBundleAdaptor::Instance().getLocString("Brighten/dim the screen") + "\"<br>\"" +\n' +
            '\n' +
            '        ResBundleAdaptor::Instance().getLocString("Recommend me something to watch") + "\"<br>\"" +\n' +
            '        ResBundleAdaptor::Instance().getLocString("Switch to the game console") + "\"";\n' +
            '        i18n_yes    = ResBundleAdaptor::Instance().getLocString("Network settings");\n' +
            '        i18n_no     = ResBundleAdaptor::Instance().getLocString("Cancel");\n' +
            '    } else {\n' +
            '    i18n_msg = ResBundleAdaptor::Instance().getLocString("Network is not connected. Do you want to go to Network Settings now to check the connection?");\n' +
            '\n' +
            '    i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes");\n' +
            '    i18n_no     = ResBundleAdaptor::Instance().getLocString("No");\n' +
            '}\n');

        var set = cppf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 11);

        var r = set.getBySource("Yes");
        test.ok(r);
        test.equal(r.getSource(), "Yes");
        test.equal(r.getKey(), "Yes");

        r = set.getBySource("Brighten/dim the screen");
        test.ok(r);
        test.equal(r.getSource(), "Brighten/dim the screen");
        test.equal(r.getKey(), "Brighten/dim the screen");

        r = set.getBySource("Channel 20 (channel number)");
        test.ok(r);
        test.equal(r.getSource(), "Channel 20 (channel number)");
        test.equal(r.getKey(), "Channel 20 (channel number)");

        test.done();
    },

    testCppFileExtractFile: function(test) {
        test.expect(11);

        var cppf = new CppFile({
            project: p,
            pathName: "./t1.cpp",
            type: cppft
        });
        test.ok(cppf);

        // should read the file
        cppf.extract();
        var set = cppf.getTranslationSet();
        test.equal(set.size(), 12);

        var r = set.getBySource("Network settings");
        test.ok(r);
        test.equal(r.getSource(), "Network settings");
        test.equal(r.getKey(), "Network settings");

        var r = set.getBy({
            reskey: "Search 'OOO(search keyword)' on YouTube"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Search 'OOO(search keyword)' on YouTube");
        test.equal(r[0].getKey(), "Search 'OOO(search keyword)' on YouTube");

        var r = set.getBy({
            reskey: "Switch to \"the game\" console"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Switch to \"the game\" console");
        test.equal(r[0].getKey(), "Switch to \"the game\" console");

        test.done();
    },

    testCppFileExtractFile2: function(test) {
        test.expect(11);

        var cppf = new CppFile({
            project: p,
            pathName: "./t2.cpp",
            type: cppft
        });
        test.ok(cppf);

        // should read the file
        cppf.extract();
        var set = cppf.getTranslationSet();
        test.equal(set.size(), 3);

        var r = set.getBySource("You're\n Welcome.");
        test.ok(r);
        test.equal(r.getSource(), "You're\n Welcome.");
        test.equal(r.getKey(), "You're\n Welcome.");

        var r = set.getBy({
            reskey: "No,\n \t Thanks."
        });
        test.ok(r);
        test.equal(r[0].getSource(), "No,\n \t Thanks.");
        test.equal(r[0].getKey(), "No,\n \t Thanks.");

        var r = set.getBy({
            reskey: "Yes \"yes\"."
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Yes \"yes\".");
        test.equal(r[0].getKey(), "Yes \"yes\".");

        test.done();
    },

    testCppFileExtractUndefinedFile: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        // should attempt to read the file and not fail
        cppf.extract();

        var set = cppf.getTranslationSet();
        test.equal(set.size(), 0);
        test.done();
    },
    testCppFileTest3: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: "./t3.cpp",
            type: cppft
        });
        test.ok(cppf);
        // should attempt to read the file and not fail
        cppf.extract();

        var set = cppf.getTranslationSet();
        test.equal(set.size(), 1);

        test.done();
    },
    testCppFileNotParseCommentLine: function(test) {
        test.expect(3);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('// ResBundleAdaptor::Instance().getLocString(" Yes ");\n');

        var set = cppf.getTranslationSet();
        test.ok(set);
        test.equal(set.size(), 0);
        test.done();
    },
    testCppFileNotParseCommentLine2: function(test) {
        test.expect(3);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('/* ResBundleAdaptor::Instance().getLocString("NO"); */\n');

        var set = cppf.getTranslationSet();
        test.ok(set);
        test.equal(set.size(), 0);
        test.done();
    }
};