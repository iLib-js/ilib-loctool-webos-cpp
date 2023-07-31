/*
 * testCppFileType.js - test the C++ file type handler object.
 *
 * Copyright (c) 2020-2021, 2023 JEDLSoft
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

if (!CppFileType) {
    var CppFileType = require("../CppFileType.js");
    var CustomProject =  require("loctool/lib/CustomProject.js");
}

var p = new CustomProject({
    id: "app",
    plugins: ["../."],
    sourceLocale: "en-US"
}, "./testfiles", {
    locales:["en-GB"]
});

module.exports.cppfiletype = {
    testCppFileTypeConstructor: function(test) {
        test.expect(1);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.done();
    },
    testCppFileTypeHandlesCFileTrue: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("foo.cpp"));
        test.done();
    },
    testCppFileTypeHandlesCFileTrue2: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("foo/bar/test.cpp"));
        test.done();
    },
    testCppFileTypeHandlesJSXFalse: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(!cft.handles("foo.jsx"));
        test.done();
    },
    testCppFileTypeHandlesCppFalse: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(!cft.handles("foo.c"));
        test.done();
    },
    testCppFileTypeHandlesFalseClose: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(!cft.handles("foocpp"));
        test.done();
    },
    testCppFileTypeHandlesCC: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("abc.cc"));
        test.done();
    },
    testCppFileTypeHandlesCXX: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("src/core/main.cxx"));
        test.done();
    },
    testCppFileTypeHandlesCpp: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("./src/lib/test.c++"));
        test.done();
    },
    testCppFileTypeHandleshpp: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("foo.hpp"));
        test.done();
    },
    testCppFileTypeHandleshppfalse: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(!cft.handles("fo.ohpp"));
        test.done();
    },
    testCppFileTypeHandleshh: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("src/util.hh"));
        test.done();
    },
    testCppFileTypeHandleshhfalse: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(!cft.handles("src/util.hhh"));
        test.done();
    },
    testCppFileTypeHandlesxx: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        test.ok(cft);
        test.ok(cft.handles("/foo/bar/abcd.hxx"));
        test.done();
    },
    testCppFileTypeExtensions: function(test) {
        test.expect(2);

        var cft = new CppFileType(p);
        var expected = [ ".cpp", ".cc", ".c++", ".cxx", ".hpp", ".hh", ".hxx"];

        test.ok(cft);
        test.deepEqual(cft.getExtensions(), expected);
        test.done();
    }
};