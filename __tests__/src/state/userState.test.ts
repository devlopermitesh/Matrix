import useAccount, { accountStore, User } from "../../../src/state/userState"
import { act } from "react"

describe("Account state",()=>{
    //reset state before each operations
    beforeEach(()=>{
   accountStore.setState({
    user:null,
    theme:"Light",
    firstVisit:false,
    NotificationOn:true    
   })
    })

///update profile
it("Update profile action",()=>{
    const newUser:User={
        username:"Mitesh",
        punchLine:"Line is everywhere"
    }
    act(()=>{
     useAccount.getState().updateProfile(newUser)
    })
    expect(useAccount.getState().user).toEqual(newUser)
})
 it("should update theme", () => {
    act(() => {
      useAccount.getState().updateTheme("Dark");
    });

    expect(useAccount.getState().theme).toBe("Dark");
  });


  it("should toggle notification", () => {
    expect(useAccount.getState().NotificationOn).toBe(true);

    act(() => {
      useAccount.getState().toggleNotification();
    });

    expect(useAccount.getState().NotificationOn).toBe(false);
  });

  it("should mark as visited", () => {
    act(() => {
      useAccount.getState().visited();
    });

    expect(useAccount.getState().firstVisit).toBe(true);
  });
})




