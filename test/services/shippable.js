var shippable = require("../../lib/services/shippable");

describe("shippable service", function(){

  it ("can detect shippable", function(){
    process.env.SHIPPABLE = "true";
    expect(shippable.detect()).to.be(true);
  });

  it ("can get shippable env info", function(){
    process.env.SHIPPABLE = "true";
    process.env.COMMIT = '5678';
    process.env.BUILD_NUMBER = '91011';
    process.env.BUILD_URL = 'http://...';
    process.env.BRANCH = 'master';
    process.env.REPO_NAME = 'owner/repo';
    if (process.env.PULL_REQUEST) {
      process.env.PULL_REQUEST = 'false';
    }
    expect(shippable.configuration()).to.eql({
      service : 'shippable',
      commit : '5678',
      build : '91011',
      build_url : 'http://...',
      branch : 'master',
      owner : 'owner',
      repo : 'repo'
    });
  });
  it ("can get shippable env info with a pull request", function(){
    process.env.SHIPPABLE = "true";
    process.env.BUILD_URL = 'http://...';
    process.env.COMMIT = '5678';
    process.env.BUILD_NUMBER = '91011';
    process.env.BUILD_URL = 'http://...';
    process.env.BRANCH = 'master';
    process.env.PULL_REQUEST = '2';
    process.env.REPO_NAME = 'owner/repo';
    expect(shippable.configuration()).to.eql({
      service : 'shippable',
      commit : '5678',
      build : '91011',
      build_url : 'http://...',
      branch : 'master',
      pull_request : '2',
      owner : 'owner',
      repo : 'repo'
    });
  });

});
