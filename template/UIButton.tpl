	<name> = [UIButton buttonWithType:UIButtonTypeCustom];
	<name>.frame = CGRectMake(<x>,<y>,<w>,<h>);
	<ct>[<name> setTitleColor:[UIColor blueColor] forState:0];
	<ci>[<name> setBackgroundImage:[UIImage imageNamed:@"<nm>.png"] forState:UIControlStateNormal];
	<cs>[<name> setBackgroundImage:[UIImage imageNamed:@"<sl>.png"] forState:UIControlStateSelected];
	[self.baseView addSubview:<name>];

