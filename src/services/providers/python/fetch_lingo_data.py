import duolingo
import datetime

def duolingo_data(account):
    username,password = account.split('@')
    lingo = duolingo.Duolingo(username,password)
    streak = lingo.get_streak_info()['site_streak']

    return {"response":[{'date':(datetime.datetime.now()-datetime.timedelta(days = i)).strftime("%Y-%m-%d"),'weight':1} for i in range(streak)]}


if __name__ == '__main__':
    duolingo_data("Annie595384","magpie19")
