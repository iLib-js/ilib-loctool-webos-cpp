/*
 * CppFileType.test.js - test the C++ file type handler object.
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
describe("cppfiletype", function() {
    test("CppFileTypeConstructor", function() {
        expect.assertions(1);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
    });
    test("CppFileTypeHandlesCFileTrue", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("foo.cpp")).toBeTruthy();
    });
    test("CppFileTypeHandlesCFileTrue2", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("foo/bar/test.cpp")).toBeTruthy();
    });
    test("CppFileTypeHandlesJSXFalse", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("foo.jsx")).toBeTruthy();
    });
    test("CppFileTypeHandlesCppFalse", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("foo.c")).toBeTruthy();
    });
    test("CppFileTypeHandlesFalseClose", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("foocpp")).toBeTruthy();
    });
    test("CppFileTypeHandlesCC", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("abc.cc")).toBeTruthy();
    });
    test("CppFileTypeHandlesCXX", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("src/core/main.cxx")).toBeTruthy();
    });
    test("CppFileTypeHandlesCpp", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("./src/lib/test.c++")).toBeTruthy();
    });
    test("CppFileTypeHandleshpp", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("foo.hpp")).toBeTruthy();
    });
    test("CppFileTypeHandleshppfalse", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("fo.ohpp")).toBeTruthy();
    });
    test("CppFileTypeHandleshh", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("src/util.hh")).toBeTruthy();
    });
    test("CppFileTypeHandleshhfalse", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(!cft.handles("src/util.hhh")).toBeTruthy();
    });
    test("CppFileTypeHandlesxx", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        expect(cft).toBeTruthy();
        expect(cft.handles("/foo/bar/abcd.hxx")).toBeTruthy();
    });
    test("CppFileTypeExtensions", function() {
        expect.assertions(2);
        var cft = new CppFileType(p);
        var expected = [ ".cpp", ".cc", ".c++", ".cxx", ".hpp", ".hh", ".hxx"];
        expect(cft).toBeTruthy();
        expect(cft.getExtensions()).toStrictEqual(expected);
    });
});