using PawFinderModel;
using PawFinderDL;

namespace PawFinderBL;

public class UserBL : IUserBL
{
    private IRepository _repo;
    public UserBL(IRepository p_repo)
    {
        _repo = p_repo;
    }

    public List<User> GetAllUsers()
    {
        return _repo.GetAllUsers();
    }

    public User RegisterUser(User p_user)
    {

        if (p_user.UserName is null)
        {
            throw new Exception("User Name is empty");
        }
        else if (p_user.UserBreed is null)
        {
            throw new Exception("User Breed is empty");
        }
        else if (p_user.UserPassword is null)
        {
            throw new Exception("User Password is empty");
        }
        else if (p_user.UserSize is null)
        {
            throw new Exception("User Size is empty");
        }
        else 
        {
            return _repo.RegisterUser(p_user);
        }
    }

    public List<User> SearchUser(string p_name)
    {
        List<User> ListOfUsers = _repo.GetAllUsers();

             return ListOfUsers
                         .Where(user => user.UserName.Contains(p_name))
                         .ToList();
        
    }

    public List<User> ViewMatchedUser(int userID)
    {
        return _repo.ViewMatchedUser(userID);
    }

    public List<Message> GetConversation(int UserID1, int UserID2)
    {
        return _repo.GetConversation(UserID1, UserID2);
    }

    public User UpdateUser(User user)
    {
        return _repo.UpdateUser(user);
    }

    public Message AddMessage(Message message)
    {
        return _repo.AddMessage(message);
    }




}
