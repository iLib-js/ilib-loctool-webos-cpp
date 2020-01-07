/*
 * testCppFile.js - test the C++ file handler object.
 *
 * Copyright © 2020, JEDLSoft
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
            pathName: "./testfiles/js/t1.c",
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

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Yes")');

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

        cppf.parse('ResBundleAdaptor::Instance().getLocString("Yes")');

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

        cppf.parse('ResBundleAdaptor::Instance().getLocString(" Yes ")');

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

        cppf.parse('ResBundleAdaptor::Instance().getLocString("     Yes   ")');


        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("     Yes   ");
        test.ok(r);
        test.equal(r.getSource(), "     Yes   ");
        test.equal(r.getKey(), "     Yes   ");

        test.done();
    },

    testCppFileParseJSSimple: function(test) {
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

    testCppFileParseJSSimple2: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('localized_string = (gchar*)resBundle_getLocString(_g_res_bundle_object, "Please say \"Stop\" when you see the desired channel.");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource('Please say \"Stop\" when you see the desired channel.');
        test.ok(r);
        test.equal(r.getSource(), 'Please say \"Stop\" when you see the desired channel.');
        test.equal(r.getKey(), 'Please say \"Stop\" when you see the desired channel.');

        test.done();
    },

    testCppFileParseJSSimple3: function(test) {
        test.expect(6);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('localized_string = (gchar*)resBundle_getLocString(_g_res_bundle_object, "Please say \"Stop\" when you see the desired channel.");  // i18n Detail description');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource('Please say \"Stop\" when you see the desired channel.');
        test.ok(r);
        test.equal(r.getSource(), 'Please say \"Stop\" when you see the desired channel.');
        test.equal(r.getKey(), 'Please say \"Stop\" when you see the desired channel.');
        test.equal(r.getComment(), "Detail description");

        test.done();
    },

    testCppFileParseMoreComplex: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('char* alert_msg=(char *)resBundle_getLocString(notification_getResBundle(),"[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.ok(r);
        test.equal(r.getSource(), "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");
        test.equal(r.getKey(), "[PIN CODE : %s]<br> Enter this PIN code in your %s within 120 seconds.");

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

        cppf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n button');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "button");

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

        cppf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n OK button for Bluray player');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "OK button for Bluray player");

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

        cppf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); /* i18n button */');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
        test.equal(r.getComment(), "button");

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

        cppf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : Power button');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
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

        cppf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n  /** Connect WiSA Dongle **/ ');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
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

        cppf.parse('char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK"); // i18n : GUIDE button for Set-top box, used in screen remote');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");
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

        cppf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Standard", "Standard");');
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

        cppf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Standard", "Standard");const char* pPicture = resBundle_getLocStringWithKey(resBundle, "PictureMode.Block", "Block");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");

        var r = set.getBy({
            reskey: "PictureMode.Block"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Block");
        test.equal(r[0].getKey(), "PictureMode.Block");

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

        cppf.parse('const char* pPicture = resBundle_getLocStringWithKey(resBundle,"PictureMode.Standard", "Standard"); // i18n button');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "PictureMode.Standard"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Standard");
        test.equal(r[0].getKey(), "PictureMode.Standard");
        test.equal(r[0].getComment(), "button");

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

        cppf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block"); char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");

        test.done();
    },

    testCppFileParseMultiple2: function(test) {
        test.expect(12);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block"); char *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel"); localized_string = (gchar*)resBundle_getLocString(_g_res_bundle_object, "Please say \"Stop\" when you see the desired channel.");  // i18n Detail description');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");

        var r = set.getBySource('Please say \"Stop\" when you see the desired channel.');
        test.ok(r);
        test.equal(r.getSource(), 'Please say \"Stop\" when you see the desired channel.');
        test.equal(r.getKey(), 'Please say \"Stop\" when you see the desired channel.');
        test.equal(r.getComment(), "Detail description");

        test.done();
    },

    testCppFileParseMultipleWithKey: function(test) {
        test.expect(11);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block"); a.parse("This is another test."); char *screen_share_67 = (char *)resBundle_getLocStringWithKey(res_bundle, "Cancel.key","Cancel"); // i18n messages');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Block.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Block");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Block.key");

        r = set.getBy({
            reskey: "Cancel.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Cancel");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Cancel.key");
        test.equal(r[0].getComment(), "messages");

        test.done();
    },

    testCppFileParseMultipleWithKey2: function(test) {
        test.expect(10);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block");\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocStringWithKey(res_bundle, "Cancel.key","Cancel");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBy({
            reskey: "Block.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Block");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Block.key");

        r = set.getBy({
            reskey: "Cancel.key"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Cancel");
        test.ok(r[0].getAutoKey());
        test.equal(r[0].getKey(), "Cancel.key");

        test.done();
    },

    testCppFileParseMultipleSameLine: function(test) {
        test.expect(12);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('char *screen_share_60 = (char *)resBundle_getLocStringWithKey(res_bundle, "Block.key", "Block");\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel"); \n\tchar *screen_share_70 = (char *)resBundle_getLocString(res_bundle, "Stop");');

        var set = cppf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 3);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block.key");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");

        r = set.getBySource("Stop");
        test.ok(r);
        test.equal(r.getSource(), "Stop");
        test.equal(r.getKey(), "Stop");

        test.done();
    },

    testCppFileParseMultipleWithComments: function(test) {
        test.expect(10);

        var cppf = new CppFile({
            project: p,
            pathName: undefined,
            type: cppft
        });
        test.ok(cppf);

        cppf.parse('char *screen_share_60 = (char *)resBundle_getLocString(res_bundle, "Block");// i18n foo\n\ta.parse("This is another test.");\n\t\tchar *screen_share_67 = (char *)resBundle_getLocString(res_bundle, "Cancel");  // i18n bar');
        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("Block");
        test.ok(r);
        test.equal(r.getSource(), "Block");
        test.equal(r.getKey(), "Block");
        test.equal(r.getComment(), "foo");

        r = set.getBySource("Cancel");
        test.ok(r);
        test.equal(r.getSource(), "Cancel");
        test.equal(r.getKey(), "Cancel");
        test.equal(r.getComment(), "bar");

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

        cppf.parse('m_localeStringTryControl = mp_resBundle->getLocString(notification_getResBundle(), "OK");\n\tchar* notifi_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK");');
        var set = cppf.getTranslationSet();
        test.ok(set);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");

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

        cppf.parse('m_localeStringTryControl = mp_resBundle->getLocString(notification_getResBundle(), foobar);');

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

        cppf.parse('m_localeStringTryControl = mp_resBundle->getLocString();');

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

        cppf.parse('m_localeStringTryControl = mp_resBundle->ggetLocString(notification_getResBundle(), "OK");');

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
            '    bool ret = FALSE;\n' +
            '    struct json_object *jobj=NULL, *subjobj=NULL, *btnjobj=NULL, *pramjobj=NULL, *aryjobj=NULL, *closejobj=NULL;\n' +
            '    char msg[1024]={0,};\n' +
            '\n' +
            '    char* alert_btn= (char *)resBundle_getLocString(notification_getResBundle(), "OK");\n' +
            '    char* alert_msg_line1= (char *)resBundle_getLocString(notification_getResBundle(), "The device cannot be connected to your TV.");\n' +
            '    char* alert_msg_line2= (char *)resBundle_getLocString(notification_getResBundle(), "Please try again. If the issue persists, please restart your TV or check your device.");\n' +
            '\n' +
            '    jobj = json_object_new_object();\n' +
            '    aryjobj=json_object_new_array();\n' +
            '\n');

        var set = cppf.getTranslationSet();
        test.ok(set);

        test.equal(set.size(), 3);

        var r = set.getBySource("OK");
        test.ok(r);
        test.equal(r.getSource(), "OK");
        test.equal(r.getKey(), "OK");

        r = set.getBySource("The device cannot be connected to your TV.");
        test.ok(r);
        test.equal(r.getSource(), "The device cannot be connected to your TV.");
        test.equal(r.getKey(), "The device cannot be connected to your TV.");

        r = set.getBySource("Please try again. If the issue persists, please restart your TV or check your device.");
        test.ok(r);
        test.equal(r.getSource(), "Please try again. If the issue persists, please restart your TV or check your device.");
        test.equal(r.getKey(), "Please try again. If the issue persists, please restart your TV or check your device.");

        test.done();
    },

    testCppFileExtractFile: function(test) {
        test.expect(8);

        var cppf = new CppFile({
            project: p,
            pathName: "./t1.c",
            type: cppft
        });
        test.ok(cppf);

        // should read the file
        cppf.extract();
        var set = cppf.getTranslationSet();
        test.equal(set.size(), 29);

        var r = set.getBySource("Decline");
        test.ok(r);
        test.equal(r.getSource(), "Decline");
        test.equal(r.getKey(), "Decline");

        var r = set.getBy({
            reskey: "Do you want to accept this request?"
        });
        test.ok(r);
        test.equal(r[0].getSource(), "Do you want to accept this request?");
        test.equal(r[0].getKey(), "Do you want to accept this request?");

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
    testCppFileTest2: function(test) {
        test.expect(5);

        var cppf = new CppFile({
            project: p,
            pathName: "./t2.c",
            type: cppft
        });
        test.ok(cppf);

        cppf.extract();
        var set = cppf.getTranslationSet();
        test.equal(set.size(), 1);

        var r = set.getBySource("Please say \"Stop\" when you see the desired channel.");
        test.ok(r);
        test.equal(r.getSource(), "Please say \"Stop\" when you see the desired channel.");
        test.equal(r.getKey(), "Please say \"Stop\" when you see the desired channel.");

        test.done();
    },
    testCppFileTest3: function(test) {
        test.expect(2);

        var cppf = new CppFile({
            project: p,
            pathName: "./t3.c",
            type: cppft
        });
        test.ok(cppf);
        // should attempt to read the file and not fail
        cppf.extract();

        var set = cppf.getTranslationSet();
        test.equal(set.size(), 0);

        test.done();
    }
};
