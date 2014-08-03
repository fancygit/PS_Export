	<cd>UIButton *<name> = nil;
	<name> = [UIButton buttonWithType:UIButtonTypeCustom];
	<name>.frame = CGRectMake(<x>,<y>,<w>,<h>);
	<ct>[<name> setTitleColor:[UIColor colorWithRed:<r> green:<g> blue:<b> alpha:1.0] forState:UIControlStateNormal];
	<ct>[<name> setTitle:@"<text>" forState:UIControlStateNormal];
	<ct><name>.titleLabel.font = [UIFont boldSystemFontOfSize:<fontsize>.0f];
	<ci>[<name> setBackgroundImage:[UIImage imageNamed:@"<tn>.png"] forState:UIControlStateNormal];
	<cs>[<name> setBackgroundImage:[UIImage imageNamed:@"<ts>.png"] forState:UIControlStateSelected];
	<update>
	[<parent> addSubview:<name>];

