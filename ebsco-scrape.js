// EBSCO Results Scraper
// By John Oberlin

// For use on an EBSCOhost results page, eg "web.a.ebscohost.com..."
// Results page settings (may or may not affect scrape)
//  pageOptions:
//    resultFormat: Detailed
//    quickView: off
//    perPage: 50
//    pageLayout: 1
//  limiters:
//    limitTo: Peer Reviewed
//    sourceType: Academic Journals

var data = "";
var header = [
  "doi",
  "year",
  "quarter",
  "database",
  "publisher",
  "resource",
  "pubType",
  "title",
  "citeInfo",
  "abstract"
  ];
for (i = 0; i < header.length; i++) {
  data += header[i] + "\t";
}
data += "\n";
var records = document.getElementsByClassName("result-list-record");
for (i = 0; i < records.length; i++) {
  var jData = JSON.parse(
    records[i]
      .getAttribute("data-amplitude")
    );
  var info = records[i]
    .getElementsByClassName("display-info")[0]
    .innerText;
  if(/Abstracts{0}/.test(info)) {
    // Fix condition to skip case
    // where no abstract but database name is like %Abtracts.
    citeInfo = info.match(/By:\s(.+)\sAbstract/);
    citeInfo = citeInfo[1];
    abstract = info.match(/Abstract(.+)/)
    abstract = abstract[1]
      .replace(/^Abstract/, "")
      .replace(/^:/, "")
      .replace(/^\s/, "");
  } else {
    citeInfo = info;
    abstract = "#N/A";
  }
  entry = [
    jData.doi,
    jData.pub_year,
    "-",
    jData.database,
    jData.publisher,
    jData.source,
    jData.pub_type,
    jData.title.replace(/\.$/, ""),
    citeInfo,
    abstract,
    ];
  for (j = 0; j < entry.length; j++) {
    data += entry[j] + "\t";
  }
  data += "\n";
}
console.log(data);