#include <bits/stdc++.h>
 int Quiz(int a,int b,int c);
int main() {
    int n,i,a,b,c,count=0; cin >> n;
    for(i=1;i<=n;i++)
    {
       cin >> a>>b>>c;
        count+=Quiz(a,b,c);
    }
     cout<<count;
    return 0;
}
 int Quiz(int a,int b,int c)
 {
     if(a+b+c>1)
      return 1;
   else
return 0;
}