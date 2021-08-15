import requests
import re
import os
import dotenv
dotenv.load_dotenv()
github_token = os.getenv('GITHUB_TOKEN')
query_string = """
query { 
  user(login: "$") {
    email
    createdAt
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date 
            contributionCount 
          }
        }
      }
    }
  }
}"""
url = 'https://api.github.com/graphql'
def github_data(username):
    query = re.sub("[$]",username,query_string)
    days = []

    r = requests.post(url,json = {'query':query},headers = {"Authorization":f"bearer {github_token}"}).json()
    for week in r["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]:
        for day in week["contributionDays"]:
            days.append({'date':day['date'],'weight':day['contributionCount']})


    return {'response':days}
