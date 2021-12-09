import json
import urllib.request, urllib.parse, urllib.error
import ssl
from bs4 import BeautifulSoup
import re
ctx = ssl.create_default_context();
ctx.check_hostname = False;
ctx.verify_mode = ssl.CERT_NONE;
import csv

def getInfoListIdict (html, Year):
    #webSite = 'https://www.scimagoir.com/rankings.php?sector=Higher+educ.&year=2015'
    dictId = {}
    webSite = html;
    x = urllib.request.urlopen(webSite, context=ctx);
    soup = BeautifulSoup(x, 'html.parser')
    #print(soup.prettify())
    rows = soup.find_all('a')
    #subString1 = "Univer";
    #subString2 = "College";
    row2 = soup.find_all('tr');
    #print(len(row2))
    #print(len(UniList))
    infoList = []
    #print(row2.attrs['href']);
    counter = 1;
    for row in row2:          
        #infoDict = {};
        infoList_this = []
        text = row.get_text()
    
       
        #print(row.get_text());
        textList = text.split()
        #print(textList)
        if (len(textList) < 2):
            continue;
        rank = textList[0]
        univer = ''
        ctr = '';
        if ('*' in textList[-1]):
            for i in range(1, len(textList) - 1):
                if (i != len(textList) - 1):
                    univer = univer + textList[i] + " ";
                else:
                    univer = univer + textList[i];
            ctr = textList[-1][1:];
        else:
            for i in range(1, len(textList)):
                if (i != len(textList) - 1):
                    univer = univer + textList[i] + " ";
                else:
                    univer = univer + textList[i][:-3];
                    #ctr = 'NA';
            ctr = textList[len(textList) - 1][-3:];

        #infoDict['Rank'] = int(rank);
        infoList_this.append(int(rank))
        s = univer;
        result = s[s.find('(')+1:s.find(')')]
        #print(result)
        #infoDict['Global Rank'] = int(result)
        infoList_this.append(int(result));
        #print(univer[1:4])
        #infoDict['University Name'] = univer[5:];
        infoList_this.append(univer[len(result) + 2:])
        #infoDict['Country'] = ctr;
        infoList_this.append(ctr);
        #infoDict['Year'] = Year;
        infoList_this.append(Year);
        
        infoList.append(infoList_this);
        #idDIct[univer[len(result) + 2:]] = counter;
        

    return infoList;

#list_2021 = getInfoListIdict ('https://www.scimagoir.com/rankings.php?sector=Higher+educ.&ranking=Overall&area=all', 2021);
#print(list_2021);

list_2021 = getInfoListIdict ('https://www.scimagoir.com/rankings.php?sector=Higher+educ.&ranking=Overall&area=3100', 2021);
column_feature = ['Rank', 'Global Rank', 'University Name', 'Country', 'Year'];
print(list_2021)
fileList = [];
with open('college_phys&Astro_rank_2021_complete.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(column_feature);
    for smallList in list_2021:
        writer.writerow(smallList)

#print(InfoList)
