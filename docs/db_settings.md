# ocms_settings

__keys__:
* setting_id  - id
* setting_key - varchar(90)
* setting_value - medium text
 
### setting_key in use

__mainpage__
purpose: Stores mainpage id
returns INT

__errorpage__
purpose: Stores errorpage id
returns INT

__nav_item__
purpose: Stores navigation data
returns ARRAY of OBJECTS

    __OBJECT__ Structure
    * children []
    * name: string
    * target: id