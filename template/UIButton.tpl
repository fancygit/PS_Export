	<cd><name> = [UIButton buttonWithType:UIButtonTypeCustom];
	<name>.frame = CGRectMake(<x>,<y>,<w>,<h>);
	<ct>[<name> setTitleColor:[UIColor colorWithRed:<r> green:<g> blue:<b> alpha:1.0] forState:UIControlStateNormal];
	<ct>[<name> setTitle:@"<text>" forState:UIControlStateNormal];
	<ct><name>.titleLabel.font = [UIFont boldSystemFontOfSize:<fontsize>.0f];
	<ci>[<name> setBackgroundImage:[UIImage imageNamed:@"<nm>.png"] forState:UIControlStateNormal];
	<cs>[<name> setBackgroundImage:[UIImage imageNamed:@"<sl>.png"] forState:UIControlStateSelected];
	<update>
	[<parent> addSubview:<name>];

