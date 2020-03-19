## Want to use Hive Mind? Follow the instructions bellow to run the application.

1. Clone down this repository by clicking the "Clone or Download" button above, copying the SSH key, and running the following command in your terminal `git clone SSHKEYGOESHERE`.
1. `cd` into the root directory of the app.
1. Run `npm install` and wait for all dependencies to be installed.
1. `cd` into /src/modules and open the Credentials.js.example file.
1. You must sign up for a Cloudinary account (https://cloudinary.com/) and get your own Cloudname and Upload preset to use the image upload functionality in this app. Once you login to Cloudinary, your cloud name will be at top of the dashboard page and your upload preset will be under settings > upload > upload preset. You will need to use the unsigned preset.  
1. Once you have your cloud name and upload preset, copy and paste them into the appropriate spot in the Credentials.js.example file.
1. Remove the .example extension from the Credentials.js.example file.
1. If you haven't already done so, please go to the API for this app and complete the setup instructions, then return here and complete the next two steps to start the app. The API can be found here: https://github.com/laurenriddle/Hive-Mind-Back-End-Capstone-Api
1. Run `npm start` to verify that installation was successful and start the application.
1. Go to http://localhost:3000/ to view the app. 