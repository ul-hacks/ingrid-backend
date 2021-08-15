import requests
import re
import os
import dotenv
import datetime
from itertools import chain
from collections import Counter
dotenv.load_dotenv()
gitlab_token = os.getenv('GITLAB_TOKEN')


header = {"Authorization":f"bearer {gitlab_token}"}
def gitlab_data(account):
    username,name = account.split("@")
    return Counter(list(chain.from_iterable([[v['committed_date'].split("T")[0] for v in get_all_commits_gitlab(i,name) ]for i in get_all_projects(get_user_id(username))])))
def get_all_commits_gitlab(project_id, username):
    json_loads_of_commit = []
    f_date = "2022-01-01T00:00:42.000+01:00"
    params = {"until": f_date}
    url_p = f"https://gitlab.com/api/v4/projects/{project_id}/repository/commits"
    r = requests.get(url_p, params, headers=header)

    c = 0

    while r.status_code == 200:
        jsLoad = r.json()
        newDate = jsLoad[-1]["committed_date"]
        if (params["until"] == newDate):
            break
        user_commits = []
        for cm in jsLoad:
            if cm["author_name"] == username:
                user_commits.append(cm)
                c += 1
        json_loads_of_commit.append(user_commits)
        params["until"] = newDate
        r = requests.get(url_p, params, headers=header)
    print("project %d: %d commits by user %s, \
            the first one %s" % (project_id, c, username, newDate))
    return json_loads_of_commit[0]
def get_all_projects(id):
    url = f"https://gitlab.com/api/v4/users/{id}/projects"
    r = requests.get(url,headers=header)
    if r.status_code==200:
        return [i['id'] for i in r.json()]
def get_user_id(username):
    url = f"https://gitlab.com/api/v4/users?username={username}"
    r = requests.get(url,headers = header)
    return int(r.json()[0]['id'])

if __name__ == '__main__':
    #gitlab_data("mrpicklepinosaur")
    Counter(list(chain.from_iterable([[v['committed_date'].split("T")[0] for v in get_all_commits_gitlab(i,"Daniel Liu") ]for i in get_all_projects(get_user_id("mrpicklepinosaur"))])))



    #print(get_all_commits_gitlab(23559071,"mrpicklepinosaur"))