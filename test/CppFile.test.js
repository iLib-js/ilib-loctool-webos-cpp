/*
 * CppFile.test.js - test the C++ file handler object.
 *
 * Copyright (c) 2020-2021,2023 JEDLSoft
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

describe("cppfile", function() {
    test("CppFileConstructor", function() {
        expect.assertions(1);

        var cppf = new CppFile({project: p});
        expect(cppf).toBeTruthy();
    });
    test("CppFileConstructorParams", function() {
        expect.assertions(1);

        var cppf = new CppFile({
            project: p,
            pathName: "./testfiles/t1.cpp",
            type: cppft
        });

        expect(cppf).toBeTruthy();
    });
    test("CppFileConstructorNoFile", function() {
        expect.assertions(1);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
    });
    test("CppFileMakeKey", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
        expect(cppf.makeKey("This is a test")).toBe("This is a test");
    });
    test("CppFileMakeKey2", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
        expect(cppf.makeKey("This is a \t\"test\"")).toBe("This is a \t\"test\"");
    });
    test("CppFileMakeKeyWithSpace", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
        expect(cppf.makeKey(" This is a test ")).toBe(" This is a test ");
    });
    test("CppFileMakeKeyWithSpaces", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
        expect(cppf.makeKey("   This is a test   ")).toBe("   This is a test   ");
    });
    test("CppFileParseSingleQuote", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
        cppf.parse('ResBundleAdaptor::Instance().getLocString("Don\'t save");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();
        expect(set.size()).toBe(1);

        var r = set.getBy({
            reskey: "Don't save"
        });
        expect(r).toBeTruthy();

        expect(r[0].getSource()).toBe("Don't save");
        expect(r[0].getKey()).toBe("Don't save");
    });
    test("CppFileParseSimpleGetByKey", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Yes");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "Yes"
        });
        expect(r).toBeTruthy();

        expect(r[0].getSource()).toBe("Yes");
        expect(r[0].getKey()).toBe("Yes");
    });
    test("CppFileParseSimpleGetBySource", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Yes");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
    });
    test("CppFileParseSimpleGetBySourceWithSpace", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('ResBundleAdaptor::Instance().getLocString(" Yes ");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource(" Yes ");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe(" Yes ");
        expect(r.getKey()).toBe(" Yes ");
    });
    test("CppFileParseSimpleGetBySourceWithSpaces", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('ResBundleAdaptor::Instance().getLocString("     Yes   ");');


        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("     Yes   ");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("     Yes   ");
        expect(r.getKey()).toBe("     Yes   ");
    });
    test("CppFileParseCppSimple", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_msg = ResBundleAdaptor::Instance().getLocString("Yes");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
    });
    test("CppFileParseCppSimple2", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Try again.");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Try again.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Try again.");
        expect(r.getKey()).toBe("Try again.");
    });
    test("CppFileParseMoreComplex", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('ResBundleAdaptor::Instance().getLocString("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");  // i18n // photovideo-22');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        expect(r.getKey()).toBe("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        expect(r.getComment()).toBe("photovideo-22");
    });
    test("CppFileParseSimpleWithTranslatorComment", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n click button');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
        expect(r.getComment()).toBe("click button");
    });
    test("CppFileParseSimpleWithTranslatorComment2", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); /* i18n Yes button for Bluray player */');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
        expect(r.getComment()).toBe("Yes button for Bluray player");
    });
    test("CppFileParseSimpleWithTranslatorComment3", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n //  Yes button for Bluray player');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
        expect(r.getComment()).toBe("Yes button for Bluray player");
    });
    test("CppFileParseSimpleWithTranslatorComment4", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n : Power button');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
        expect(r.getComment()).toBe("Power button");
    });
    test("CppFileParseSimpleWithTranslatorComment5", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n  Connect WiSA Dongle');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
        expect(r.getComment()).toBe("Connect WiSA Dongle");
    });
    test("CppFileParseSimpleWithTranslatorComment6", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("Yes"); // i18n : GUIDE button for Set-top box, used in screen remote');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");
        expect(r.getComment()).toBe("GUIDE button for Set-top box, used in screen remote");
    });
    test("CppFileParseWithKey", function() {
        expect.assertions(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('i18n_yes    = ResBundleAdaptor::Instance().getLocString("PictureMode.Standard", "Standard");');
        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Standard");
        expect(r[0].getKey()).toBe("PictureMode.Standard");
    });
    test("CppFileParseWithKey2", function() {
        expect.assertions(8);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");m_localeStringNo   = mp_resBundle->getLocString("NO.key", "NO");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "YES.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("YES");
        expect(r[0].getKey()).toBe("YES.key");

        var r = set.getBy({
            reskey: "NO.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("NO");
        expect(r[0].getKey()).toBe("NO.key");
    });
    test("CppFileParseWithKeyandComment", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");   // i18n // photovideo-48');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "YES.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("YES");
        expect(r[0].getKey()).toBe("YES.key");
        expect(r[0].getComment()).toBe("photovideo-48");
    });
    test("CppFileParseMultiple", function() {
        expect.assertions(8);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES"); m_localeStringNo   = mp_resBundle->getLocString("NO" );');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("YES");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("YES");
        expect(r.getKey()).toBe("YES");

        r = set.getBySource("NO");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("NO");
        expect(r.getKey()).toBe("NO");
    });
    test("CppFileParseMultiple2", function() {
        expect.assertions(9);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES"); m_localeStringNo   = mp_resBundle->getLocString("NO" ); // i18n Detail description');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("YES");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("YES");
        expect(r.getKey()).toBe("YES");

        r = set.getBySource("NO");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("NO");
        expect(r.getKey()).toBe("NO");
        expect(r.getComment()).toBe("Detail description");
    });
    test("CppFileParseMultipleWithKey", function() {
        expect.assertions(10);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");  m_localeStringNo   = mp_resBundle->getLocString("NO.key", "NO"); m_bufStr = mp_resBundle->getLocString("Loading", "Buffering is in progress...");');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBy({
            reskey: "YES.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("YES");
        expect(r[0].getAutoKey()).toBeTruthy();
        expect(r[0].getKey()).toBe("YES.key");

        r = set.getBy({
            reskey: "NO.key"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("NO");
        expect(r[0].getAutoKey()).toBeTruthy();
        expect(r[0].getKey()).toBe("NO.key");
    });
    test("CppFileParseWithDups", function() {
        expect.assertions(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");m_localeStringYes  = mp_resBundle->getLocString("YES.key", "YES");');
        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();

        var r = set.getBySource("YES");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("YES");
        expect(r.getKey()).toBe("YES.key");

        expect(set.size()).toBe(1);
    });
    test("CppFileParseBogusNonStringParam", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString(YES); ');

        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CppFileParseEmptyParams", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->getLocString();');

        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CppFileParseWholeWord", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('m_localeStringYes  = mp_resBundle->ggetLocString();');

        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CppFileParsePunctuationBeforeRB", function() {
        expect.assertions(12);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();
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
        expect(set).toBeTruthy();

        expect(set.size()).toBe(11);

        var r = set.getBySource("Yes");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Yes");
        expect(r.getKey()).toBe("Yes");

        r = set.getBySource("Brighten/dim the screen");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Brighten/dim the screen");
        expect(r.getKey()).toBe("Brighten/dim the screen");

        r = set.getBySource("Channel 20 (channel number)");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Channel 20 (channel number)");
        expect(r.getKey()).toBe("Channel 20 (channel number)");
    });
    test("CppFileExtractFile", function() {
        expect.assertions(11);

        var cppf = new CppFile({
            project: p,
            pathName: "./t1.cpp",
            type: cppft
        });
        expect(cppf).toBeTruthy();

        // should read the file
        cppf.extract();
        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(12);

        var r = set.getBySource("Network settings");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Network settings");
        expect(r.getKey()).toBe("Network settings");

        var r = set.getBy({
            reskey: "Search 'OOO(search keyword)' on YouTube"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Search 'OOO(search keyword)' on YouTube");
        expect(r[0].getKey()).toBe("Search 'OOO(search keyword)' on YouTube");

        var r = set.getBy({
            reskey: "Switch to \"the game\" console"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Switch to \"the game\" console");
        expect(r[0].getKey()).toBe("Switch to \"the game\" console");
    });
    test("CppFileExtractFile2", function() {
        expect.assertions(14);

        var cppf = new CppFile({
            project: p,
            pathName: "./t2.cpp",
            type: cppft
        });
        expect(cppf).toBeTruthy();

        // should read the file
        cppf.extract();
        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(4);

        var r = set.getBySource("You're\n Welcome.");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("You're\n Welcome.");
        expect(r.getKey()).toBe("You're\n Welcome.");

        var r = set.getBy({
            reskey: "No,\n \t Thanks."
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("No,\n \t Thanks.");
        expect(r[0].getKey()).toBe("No,\n \t Thanks.");

        var r = set.getBy({
            reskey: "Yes \"yes\"."
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Yes \"yes\".");
        expect(r[0].getKey()).toBe("Yes \"yes\".");

        var r = set.getBy({
            reskey: "Do you want to change the settings from \'Digital Sound Output\' to \'Pass Through\' to minimize audio delay while playing game?"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Do you want to change the settings from 'Digital Sound Output' to 'Pass Through' to minimize audio delay while playing game?");
        expect(r[0].getKey()).toBe("Do you want to change the settings from 'Digital Sound Output' to 'Pass Through' to minimize audio delay while playing game?");
    });
    test("CppFileExtractUndefinedFile", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        // should attempt to read the file and not fail
        cppf.extract();

        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(0);
    });
    test("CppFileTest3", function() {
        expect.assertions(2);

        var cppf = new CppFile({
            project: p,
            pathName: "./t3.cpp",
            type: cppft
        });
        expect(cppf).toBeTruthy();
        // should attempt to read the file and not fail
        cppf.extract();

        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(3);
    });
    test("CppFileNotParseCommentLine", function() {
        expect.assertions(3);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('// ResBundleAdaptor::Instance().getLocString(" Yes ");\n');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();
        expect(set.size()).toBe(0);
    });
    test("CppFileNotParseCommentLine2", function() {
        expect.assertions(3);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        expect(cppf).toBeTruthy();

        cppf.parse('/* ResBundleAdaptor::Instance().getLocString("NO"); */\n');

        var set = cppf.getTranslationSet();
        expect(set).toBeTruthy();
        expect(set.size()).toBe(0);
    });
    test("CppFileExtractCCFile", function() {
        expect.assertions(11);

        var cppf = new CppFile({
            project: p,
            pathName: "./t4.cc",
            type: cppft
        });
        expect(cppf).toBeTruthy();

        // should read the file
        cppf.extract();
        var set = cppf.getTranslationSet();
        expect(set.size()).toBe(5);

        var r = set.getBySource("Bookmarks");
        expect(r).toBeTruthy();
        expect(r.getSource()).toBe("Bookmarks");
        expect(r.getKey()).toBe("Bookmarks");

        var r = set.getBy({
            reskey: "Recommended Sites"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Recommended Sites");
        expect(r[0].getKey()).toBe("Recommended Sites");

        var r = set.getBy({
            reskey: "Go to Settings"
        });
        expect(r).toBeTruthy();
        expect(r[0].getSource()).toBe("Go to Settings");
        expect(r[0].getKey()).toBe("Go to Settings");
    });
});